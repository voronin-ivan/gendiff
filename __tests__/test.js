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

test('deep format (.json)', diffTest('deep', 'json'));
test('deep format (.yml)', diffTest('deep', 'yml'));
test('deep format (.ini)', diffTest('deep', 'ini'));
test('deep format (.json && .yml)', diffTest('deep', 'json', 'yml'));

test('plain format (.json)', diffTest('plain', 'json'));
test('plain format (.yml)', diffTest('plain', 'yml'));
test('plain format (.ini)', diffTest('plain', 'ini'));
test('plain format (.yml && .ini)', diffTest('plain', 'yml', 'ini'));

test('json format (.json)', diffTest('json', 'json'));
test('json format (.yml)', diffTest('json', 'yml'));
test('json format (.ini)', diffTest('json', 'ini'));
test('json format (.yml && .ini)', diffTest('json', 'yml', 'ini'));
