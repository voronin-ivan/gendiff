import { isPlainObject } from 'lodash';

const renderString = (name, message) => `Property '${name}' was ${message}`;

const stringify = (value) => {
  if (isPlainObject(value)) return 'complex value';

  return typeof value === 'string' ? `'${value}'` : value;
};

const render = (nodes, parents = '') => {
  const properties = nodes
    .filter(node => node.type !== 'same')
    .map((node) => {
      const { value } = node;
      const name = `${parents}${node.key}`;

      switch (node.type) {
        case 'changed':
          const oldValue = stringify(node.oldValue);
          const newValue = stringify(node.newValue);

          return renderString(name, `updated. From ${oldValue} to ${newValue}`);
        case 'added':
          const renderedValue = stringify(value);
          const endOfString = isPlainObject(value)
            ? renderedValue
            : `value: ${renderedValue}`;

          return renderString(name, `added with ${endOfString}`);
        case 'removed':
          return renderString(name, 'removed');
        default:
          return render(node.children, `${name}.`);
      }
    });

  return properties.join('\n');
};

export default ast => render(ast);
