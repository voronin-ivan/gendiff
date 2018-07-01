import { isPlainObject, flatten } from 'lodash';

const render = (nodes, depth) => {
  const indent = (count = 0) => `${' '.repeat(depth * 4 + count)}`;

  const stringify = (value) => {
    if (!isPlainObject(value)) return value;

    const difference = Object.keys(value).reduce((acc, key) =>
      `${acc}${indent(8)}${key}: ${value[key]}\n`, '\n');

    return `{${difference}${indent(4)}}`;
  };

  const renderString = (symbol, key, value) =>
    `${indent(2)}${symbol} ${key}: ${stringify(value)}`;

  const properties = nodes.map((node) => {
    const { key, value } = node;

    switch (node.type) {
      case 'deep':
        return `${indent(4)}${key}: ${render(node.children, depth + 1)}`;
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

  return `{\n${result}\n${indent()}}`;
};

export default ast => render(ast, 0);
