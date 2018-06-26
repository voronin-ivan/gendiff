// @flow

import { readFileSync } from 'fs';
import { has } from 'lodash';

export default (firstConfigPath: string, secondConfigPath: string): string => {
    let firstConfig;
    let secondConfig;

    try {
        firstConfig = JSON.parse(readFileSync(firstConfigPath, 'utf8'));
        secondConfig = JSON.parse(readFileSync(secondConfigPath, 'utf8'));
    } catch (error) {
        return error;
    }

    const configsKeys: Array<string> = Object.keys({ ...firstConfig, ...secondConfig });

    const printProperty = (
        symbol: string,
        key: string,
        value: string,
    ): string => `  ${symbol} ${key}: ${value}\n`;

    const difference = configsKeys.reduce((acc: string, key: string): string => {
        const firstValue: string = firstConfig[key];
        const secondValue: string = secondConfig[key];

        if (has(firstConfig, key) && has(secondConfig, key)) {
            return firstValue === secondValue
                ? acc + printProperty(' ', key, firstValue)
                : acc + printProperty('+', key, secondValue) + printProperty('-', key, firstValue);
        }

        if (has(firstConfig, key)) {
            return acc + printProperty('-', key, firstValue);
        }

        return acc + printProperty('+', key, secondValue);
    }, '\n');

    return `{${difference}}`;
};
