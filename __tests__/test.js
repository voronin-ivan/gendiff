import { readFileSync } from 'fs';
import compareDiff from '../src';

const expected = '__tests__/__fixtures__/expected.txt';
const before = format => `__tests__/__fixtures__/before.${format}`;
const after = format => `__tests__/__fixtures__/after.${format}`;

const diffTest = format => () => {
    expect(compareDiff(before(format), after(format)))
        .toEqual(readFileSync(expected, 'utf8'));
};

test('JSON diff', diffTest('json'));
test('yaml diff', diffTest('yml'));
