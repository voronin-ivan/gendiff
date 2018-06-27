// @flow

import { readFileSync } from 'fs';
import { extname } from 'path';
import { has } from 'lodash';
import parse from './parser';

const parseFile = (path: string) => {
    try {
        return parse(extname(path), readFileSync(path, 'utf8'));
    } catch (error) {
        throw new Error(error);
    }
};

const printProperty = (
    symbol: string,
    key: string,
    value: string,
): string => `  ${symbol} ${key}: ${value}\n`;

export default (firstConfigPath: string, secondConfigPath: string): string => {
    const firstConfig = parseFile(firstConfigPath);
    const secondConfig = parseFile(secondConfigPath);

    const configsKeys: Array<string> = Object.keys({ ...firstConfig, ...secondConfig });

    const difference = configsKeys.reduce((acc: string, key: string): string => {
        const firstValue: string = firstConfig[key];
        const secondValue: string = secondConfig[key];

        if (has(firstConfig, key) && has(secondConfig, key)) {
            return firstValue === secondValue
                ? `${acc}${printProperty(' ', key, firstValue)}`
                : `${acc}${printProperty('+', key, secondValue)}${printProperty('-', key, firstValue)}`;
        }

        if (has(firstConfig, key)) {
            return `${acc}${printProperty('-', key, firstValue)}`;
        }

        return `${acc}${printProperty('+', key, secondValue)}`;
    }, '\n');

    return `{${difference}}`;
};
