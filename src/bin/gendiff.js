#!/usr/bin/env node
import gendiff from 'commander';
import { version, description } from '../../package';
import compareDiff from '..';

gendiff
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format (deep, plain or json)')
  .action((firstConfig, secondConfig) => {
    console.log(compareDiff(firstConfig, secondConfig, gendiff.format));
  })
  .parse(process.argv);
