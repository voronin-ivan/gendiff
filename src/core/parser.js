import { safeLoad } from 'js-yaml';

const formats = {
    '.json': JSON.parse,
    '.yml': safeLoad,
};

export default (format, file) => (formats[format] ? formats[format](file) : undefined);
