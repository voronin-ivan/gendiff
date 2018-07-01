import { isPlainObject } from 'lodash';

const renderNode = (nodes, depth) => {
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
        return `${indent(4)}${key}: ${renderNode(node.children, depth + 1)}`;
      case 'changed':
        const oldProperty = renderString('-', key, node.oldValue);
        const newProperty = renderString('+', key, node.newValue);
        return `${oldProperty}\n${newProperty}`;
      case 'added':
        return `${renderString('+', key, value)}`;
      case 'removed':
        return `${renderString('-', key, value)}`;
      default:
        return `${renderString(' ', key, value)}`;
    }
  });

  return `{\n${properties.join('\n')}\n${indent()}}`;
};

export default ast => renderNode(ast, 0);
