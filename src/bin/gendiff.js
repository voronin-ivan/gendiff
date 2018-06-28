#!/usr/bin/env node
import gendiff from 'commander';
import { version, description } from '../../package';
import compareDiff from '..';

gendiff
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    console.log(compareDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
