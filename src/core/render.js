import { isPlainObject } from 'lodash';

const renderNode = (node, depth) => {
  const indent = (count = 0) => `${' '.repeat(depth * 4 + count)}`;

  const stringify = (value) => {
    if (!isPlainObject(value)) return value;

    const difference = Object.keys(value).reduce((acc, key) =>
      `${acc}${indent(8)}${key}: ${value[key]}\n`, '\n');

    return `{${difference}${indent(4)}}`;
  };

  const renderString = (symbol, key, value) =>
    `${indent(2)}${symbol} ${key}: ${stringify(value)}\n`;

  const difference = Object.keys(node).reduce((acc, key) => {
    const { type, value } = node[key];

    switch (type) {
      case 'deep':
        return `${acc}${indent(4)}${key}: ${renderNode(value, depth + 1)}\n`;
      case 'same':
        return `${acc}${renderString(' ', key, value)}`;
      case 'changed':
        const oldProperty = renderString('-', key, value.oldValue);
        const newProperty = renderString('+', key, value.newValue);

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
