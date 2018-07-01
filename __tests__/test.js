import { readFileSync } from 'fs';
import compareDiff from '../src';

const expected = format => `__tests__/__fixtures__/${format}Diff.txt`;
const before = extension => `__tests__/__fixtures__/before.${extension}`;
const after = extension => `__tests__/__fixtures__/after.${extension}`;

const diffTest = (
  format,
  extensionBefore,
  extensionAfter = extensionBefore,
) => () => {
  expect(readFileSync(expected(format), 'utf8'))
    .toEqual(compareDiff(before(extensionBefore), after(extensionAfter), format));
};

test('JSON deep diff', diffTest('deep', 'json'));
test('yaml deep diff', diffTest('deep', 'yml'));
test('ini deep diff', diffTest('deep', 'ini'));
test('JSON && yaml deep diff', diffTest('deep', 'json', 'yml'));

test('JSON plain diff', diffTest('plain', 'json'));
test('yaml plain diff', diffTest('plain', 'yml'));
test('ini plain diff', diffTest('plain', 'ini'));
test('yaml && ini deep diff', diffTest('plain', 'yml', 'ini'));
