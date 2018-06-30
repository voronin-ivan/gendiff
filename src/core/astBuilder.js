import _ from 'lodash';

const buildAst = (config1, config2) => {
  const types = [
    {
      type: 'deep',
      check: key => _.isPlainObject(config1[key]) && _.isPlainObject(config2[key]),
      getProperties: key => ({ children: buildAst(config1[key], config2[key]) }),
    },
    {
      type: 'same',
      check: key => (
        _.has(config1, key) && _.has(config2, key) && config1[key] === config2[key]
      ),
      getProperties: key => ({ value: config1[key] }),
    },
    {
      type: 'changed',
      check: key => (
        _.has(config1, key) && _.has(config2, key) && config1[key] !== config2[key]
      ),
      getProperties: key => ({
        oldValue: config1[key],
        newValue: config2[key],
      }),
    },
    {
      type: 'added',
      check: key => !_.has(config1, key) && _.has(config2, key),
      getProperties: key => ({ value: config2[key] }),
    },
    {
      type: 'removed',
      check: key => _.has(config1, key) && !_.has(config2, key),
      getProperties: key => ({ value: config1[key] }),
    },
  ];

  const configsKeys = _.union(
    Object.keys(config1),
    Object.keys(config2),
  );

  return configsKeys.map((key) => {
    const { type, getProperties } = _.find(types, ({ check }) => check(key));

    return { key, type, ...getProperties(key) };
  });
};

export default buildAst;
