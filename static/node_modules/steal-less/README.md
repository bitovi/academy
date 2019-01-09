[![Build Status](https://api.travis-ci.org/stealjs/steal-less.svg?branch=master)](https://travis-ci.org/stealjs/steal-less)
[![npm version](https://badge.fury.io/js/steal-less.svg)](http://badge.fury.io/js/steal-less)

# steal-less

This is a plugin for [StealJS](http://stealjs.com/) that makes it easy to work with [less](http://lesscss.org/) files.

## Usage

Install `steal-less` as an npm dependency:

```shell
npm install steal-less --save-dev
```

Next, add `steal-less` under `plugins` in the `steal` section of your `package.json`:

```json
{
  "name": "your-project",
  ...
  "steal": {
    "plugins": [
      "steal-less"
    ],
    ...
  }
}
```

Once installed, `steal-less` allows you to import/require/steal Less files within your project:

```js
// ES6
import "style.less";

// AMD
define(["style.less"],function(){ ... });

// CommonJS
require("style.less");

// steal
steal("style.less")
```

## Contributing

Want to help make `steal-less` even better? See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Looking for a changelog? Try the [releases page on GitHub](https://github.com/stealjs/steal-less/releases).
