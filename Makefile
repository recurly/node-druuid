REPORTER = "spec"

default: install

install: node_modules

node_modules: package.json
	@npm -s install

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require "should" \
		--reporter $(REPORTER) \
		--check-leaks \

clean:
	@rm -rf node_modules

.PHONY: install test clean
