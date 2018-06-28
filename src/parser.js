import { safeLoad } from 'js-yaml';
import { decode } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.ini': decode,
};

export default (format, file) => {
  const parse = parsers[format];

  if (!parse) {
    throw new Error(`${format} is not yet supported.`);
  }

  return parse(file);
};
