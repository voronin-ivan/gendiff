import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
};

export default (format, file) => {
  const parse = parsers[format];

  if (!parse) {
    throw new Error(`${format} is not yet supported.`);
  }

  return parse(file);
};
