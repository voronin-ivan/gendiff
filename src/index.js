// @flow

import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './core/parser';
import buildAst from './core/astBuilder';
import render from './renderers';

export default (
  firstConfigPath: string,
  secondConfigPath: string,
  format: string = 'deep',
): string => {
  const firstConfig = parse(
    extname(firstConfigPath),
    readFileSync(firstConfigPath).toString(),
  );

  const secondConfig = parse(
    extname(secondConfigPath),
    readFileSync(secondConfigPath).toString(),
  );

  const ast = buildAst(firstConfig, secondConfig);

  return render(format, ast);
};
