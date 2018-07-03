// @flow

import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './core/parser';
import buildAst from './core/astBuilder';
import render from './renderers';

type Node = {
  key: string,
  type: number,
  value: ?any,
  oldValue: ?any,
  children: ?Array<Node>
};

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

  const ast: Array<Node> = buildAst(firstConfig, secondConfig);

  return render(format, ast);
};
