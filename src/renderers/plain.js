import { isPlainObject } from 'lodash';

const render = (nodes, parents = '') => {
  const stringify = (value) => {
    if (isPlainObject(value)) return 'complex value';

    return typeof value === 'string' ? `'${value}'` : value;
  };

  const renderString = (name, message) =>
    `Property '${parents}${name}' was ${message}`;

  const properties = nodes
    .filter(node => node.type !== 'same')
    .map((node) => {
      const { key, value } = node;

      switch (node.type) {
        case 'changed':
          const oldValue = stringify(node.oldValue);
          const newValue = stringify(node.newValue);

          return renderString(key, `updated. From ${oldValue} to ${newValue}`);
        case 'added':
          const renderedValue = stringify(value);
          const endOfString = isPlainObject(value)
            ? renderedValue
            : `value: ${renderedValue}`;

          return renderString(key, `added with ${endOfString}`);
        case 'removed':
          return renderString(key, 'removed');
        default:
          return render(node.children, `${parents}${key}.`);
      }
    });

  return properties.join('\n');
};

export default ast => render(ast);
