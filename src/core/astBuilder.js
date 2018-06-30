import _ from 'lodash';

const buildAst = (config1, config2) => {
  const types = [
    {
      type: 'deep',
      check: key => _.isPlainObject(config1[key]) && _.isPlainObject(config2[key]),
      getValue: key => buildAst(config1[key], config2[key]),
    },
    {
      type: 'same',
      check: key => (
        _.has(config1, key) && _.has(config2, key) && config1[key] === config2[key]
      ),
      getValue: key => config1[key],
    },
    {
      type: 'changed',
      check: key => (
        _.has(config1, key) && _.has(config2, key) && config1[key] !== config2[key]
      ),
      getValue: key => ({
        oldValue: config1[key],
        newValue: config2[key],
      }),
    },
    {
      type: 'added',
      check: key => !_.has(config1, key) && _.has(config2, key),
      getValue: key => config2[key],
    },
    {
      type: 'removed',
      check: key => _.has(config1, key) && !_.has(config2, key),
      getValue: key => config1[key],
    },
  ];

  const configsKeys = _.union(
    Object.keys(config1),
    Object.keys(config2),
  );

  return configsKeys.reduce((acc, key) => {
    const { type, getValue } = _.find(types, ({ check }) => check(key));

    return { ...acc, [key]: { type, value: getValue(key) } };
  }, {});
};

export default buildAst;
