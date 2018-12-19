publish-docs:
	npm install --no-shrinkwrap
	git checkout -b gh-pages
	./node_modules/.bin/bit-docs -fd
	git add -f doc/
	git fetch
	git checkout origin/gh-pages -- CNAME
	git checkout origin/gh-pages -- release/
	git commit -m "Publish docs"
	git push -f origin gh-pages
	git rm -q -r --cached node_modules
	git checkout -
	git branch -D gh-pages
