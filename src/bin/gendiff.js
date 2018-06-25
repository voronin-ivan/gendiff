#!/usr/bin/env node
import gendiff from 'commander';
import { version, description } from '../../package';

gendiff
    .version(version)
    .description(description)
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
