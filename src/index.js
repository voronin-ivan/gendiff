// @flow

import { readFileSync } from 'fs';
import { extname } from 'path';
import { has } from 'lodash';
import parse from './parser';

export default (firstConfigPath: string, secondConfigPath: string): string => {
    const firstConfig = parse(
        extname(firstConfigPath),
        readFileSync(firstConfigPath),
    );
    const secondConfig = parse(
        extname(secondConfigPath),
        readFileSync(secondConfigPath),
    );

    const configsKeys: Array<string> = Object.keys({ ...firstConfig, ...secondConfig });

    const renderString = (
        symbol: string,
        key: string,
        value: string,
    ): string => `  ${symbol} ${key}: ${value}\n`;

    const difference = configsKeys.reduce((acc: string, key: string): string => {
        const firstValue: string = firstConfig[key];
        const secondValue: string = secondConfig[key];

        if (has(firstConfig, key) && has(secondConfig, key)) {
            return firstValue === secondValue
                ? `${acc}${renderString(' ', key, firstValue)}`
                : `${acc}${renderString('+', key, secondValue)}${renderString('-', key, firstValue)}`;
        }

        if (has(firstConfig, key)) {
            return `${acc}${renderString('-', key, firstValue)}`;
        }

        return `${acc}${renderString('+', key, secondValue)}`;
    }, '\n');

    return `{${difference}}`;
};
