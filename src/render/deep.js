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
    `${indent(2)}${symbol} ${key}: ${stringify(value)}\n`;

  const difference = nodes.reduce((acc, node) => {
    const { key, value } = node;

    switch (node.type) {
      case 'deep':
        return `${acc}${indent(4)}${key}: ${renderNode(node.children, depth + 1)}\n`;
      case 'same':
        return `${acc}${renderString(' ', key, value)}`;
      case 'changed':
        const oldProperty = renderString('-', key, node.oldValue);
        const newProperty = renderString('+', key, node.newValue);

        return `${acc}${oldProperty}${newProperty}`;
      case 'added':
        return `${acc}${renderString('+', key, value)}`;
      case 'removed':
        return `${acc}${renderString('-', key, value)}`;
      default: return acc;
    }
  }, '\n');

  return `{${difference}${indent()}}`;
};

export default ast => renderNode(ast, 0);
