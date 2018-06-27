install:
	npm install

start:
	npm start -- src/bin/gendiff.js

test:
	npm test

check-types:
	npm run flow

lint:
	npm run lint .

build:
	npm run build

publish:
	npm publish
