# gendiff

[![Build Status](https://travis-ci.org/voronin-ivan/gendiff.svg?branch=master)](https://travis-ci.org/voronin-ivan/gendiff)
[![npm](https://img.shields.io/npm/v/gendiff-by-nage.svg)](https://www.npmjs.com/package/gendiff-by-nage)
[![Maintainability](https://api.codeclimate.com/v1/badges/6fb21027ead98f4f4eec/maintainability)](https://codeclimate.com/github/voronin-ivan/project-lvl2-s281/maintainability)

Compares two configuration files and shows a difference

#### Supported extensions
- json
- yaml
- ini

### Installation
    $ npm install gendiff-by-nage -g

### Usage
    $ gendiff [format] <firstConfig> <secondConfig>

### Example
    $ gendiff before.json after.json

### Options
```
-V, --version
-h, --help
-f, --format [type]
```

#### Output formats
- deep (by default)
- plain
- json

[![asciicast](https://asciinema.org/a/vZWWWujg0nMsB2yvg4OeT74eG.png)](https://asciinema.org/a/vZWWWujg0nMsB2yvg4OeT74eG)
