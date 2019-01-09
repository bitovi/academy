@parent bit-docs-generate-html/site/default/static
@module bit-docs-generate-html/site/default/static/package.json

@description The `bit-docs-site` dummy `package.json`.

@body

Contains the basics of a website package with a dependency on
[steal](https://stealjs.com/):

```js
{
  "name": "bit-docs-site",
  "version": "0.0.1",
  "description": "A site to be built",
  "main": "static.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "steal": {
    "plugins": [
      "steal-less"
    ]
  },
  "author": "Bitovi",
  "license": "MIT",
  "dependencies": {
      "steal": "1.X",
      "steal-less": "1.X"
  }
}
```

Gets copied to [bit-docs-generate-html/site/static/build/buildHash/package.json].
