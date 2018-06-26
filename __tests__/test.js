import { readFileSync } from 'fs';
import compareDiff from '../src';

test('JSON diff', () => {
    const before = '__tests__/__fixtures__/before.json';
    const after = '__tests__/__fixtures__/after.json';
    const expected = '__tests__/__fixtures__/expected.txt';

    expect(compareDiff(before, after)).toEqual(readFileSync(expected, 'utf8'));
});
