import { isPlainObject, flatten } from 'lodash';

const indent = depth => `${' '.repeat(depth * 4)}`;

const stringify = (value, depth) => {
  if (!isPlainObject(value)) return value;

  const difference = Object.keys(value).reduce((acc, key) =>
    `${acc}${indent(depth + 2)}${key}: ${value[key]}\n`, '\n');

  return `{${difference}${indent(depth + 1)}}`;
};

const render = (nodes, depth) => {
  const renderString = (symbol, key, value) =>
    `${indent(depth + 0.5)}${symbol} ${key}: ${stringify(value, depth)}`;

  const properties = nodes.map((node) => {
    const { key, value } = node;

    switch (node.type) {
      case 'deep':
        return `${indent(depth + 1)}${key}: ${render(node.children, depth + 1)}`;
      case 'changed':
        return [
          renderString('-', key, node.oldValue),
          renderString('+', key, node.newValue),
        ];
      case 'added':
        return `${renderString('+', key, value)}`;
      case 'removed':
        return `${renderString('-', key, value)}`;
      default:
        return `${renderString(' ', key, value)}`;
    }
  });

  const result = flatten(properties).join('\n');

  return `{\n${result}\n${indent(depth)}}`;
};

export default ast => render(ast, 0);
