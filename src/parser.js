import { safeLoad } from 'js-yaml';

const parsers = {
    '.json': JSON.parse,
    '.yml': safeLoad,
};

export default (format, file) => {
    const parser = parsers[format];

    if (!parser) {
        throw new Error(`${format} is not yet supported.`);
    }

    return parser(file);
};
