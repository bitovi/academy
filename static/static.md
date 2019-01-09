@parent bit-docs-generate-html/static
@module bit-docs-generate-html/site/default/static

@description Directory that contains the default static assets and a build
script.

@body

- [bit-docs-generate-html/site/default/static/build.html]
- [bit-docs-generate-html/site/default/static/build.js]
- [bit-docs-generate-html/site/default/static/package.json]
- [bit-docs-generate-html/site/default/static/packages.js]
- [bit-docs-generate-html/site/default/static/static.js]
- [bit-docs-generate-html/site/default/static/styles/mixins.less]
- [bit-docs-generate-html/site/default/static/styles/styles.less]
- [bit-docs-generate-html/site/default/static/styles/variables.less]

These defaults get built into a
[bit-docs-generate-html/site/static/build/buildHash] directory with a simple
[bit-docs-generate-html/site/static/build/buildHash/package.json `package.json`]
whose `name` is set to `bit-docs-site` so that [steal](https://stealjs.com/)
can be used to compile less and load dependencies on the front end of the
generated website.
