.PHONY: install build dev start clean

install:
	npm install

build:
	npm run build

watch:
	npx tsc --watch

start:
	npm start

clean:
	rm -rf dist
