install:
	npm install

start:
	npm start -- src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

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
