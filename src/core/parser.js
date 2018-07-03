import { safeLoad } from 'js-yaml';
import { decode } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': decode,
};

export default (format, data) => {
  const parse = parsers[format];

  if (!parse) {
    throw new Error(`${format} is not yet supported.`);
  }

  return parse(data);
};
