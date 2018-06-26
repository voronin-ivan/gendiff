import { readFileSync } from 'fs';
import compareDiff from '../src';

const expected = '__tests__/__fixtures__/expected.txt';
const before = format => `__tests__/__fixtures__/before.${format}`;
const after = format => `__tests__/__fixtures__/after.${format}`;

test('JSON diff', () => {
    expect(compareDiff(before('json'), after('json')))
        .toEqual(readFileSync(expected, 'utf8'));
});

test('yaml diff', () => {
    expect(compareDiff(before('yml'), after('yml')))
        .toEqual(readFileSync(expected, 'utf8'));
});
