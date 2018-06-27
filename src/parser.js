import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { extname } from 'path';

const parsers = {
    '.json': JSON.parse,
    '.yml': safeLoad,
};

export default (path) => {
    const format = extname(path);
    const parser = parsers[format];

    if (!parser) {
        throw new Error(`${format} is not yet supported.`);
    }

    try {
        return parser(readFileSync(path, 'utf8'));
    } catch (error) {
        throw new Error(error);
    }
};
