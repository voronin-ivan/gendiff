import { readFileSync } from 'fs';
import compareDiff from '../src';

const expected = '__tests__/__fixtures__/expected.txt';
const before = format => `__tests__/__fixtures__/before.${format}`;
const after = format => `__tests__/__fixtures__/after.${format}`;

const diffTest = (formatBefore, formatAfter = formatBefore) => () => {
  expect(readFileSync(expected, 'utf8'))
    .toEqual(compareDiff(before(formatBefore), after(formatAfter)));
};

test('JSON diff', diffTest('json'));
test('yaml diff', diffTest('yml'));
test('ini diff', diffTest('ini'));
test('JSON && yaml diff', diffTest('json', 'yml'));
test('JSON && ini diff', diffTest('json', 'ini'));
test('yaml && ini diff', diffTest('yml', 'ini'));
