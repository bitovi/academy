# Contributing

For general contributing guidelines, see the [Contributing Guide on DoneJS.com](https://donejs.com/contributing.html).

## Project Organization

    steal-less
    ├── docs                 # Documentation compatible with bit-docs website generator.
    ├── less-engine-node.js  # Bootstraps the Less engine for a Node environment.
    ├── less-engine.js       # Bootstraps the Less engine for a browser environment.
    ├── less.js              # Interfaces with the Less engine.
    └── test                 # Tests for the plugin (look here to get an idea of how to use).

## Developing Locally

### Installing the dependencies

Install the packages defined in [`package.json`](package.json):

```shell
npm install
```

### Running the tests

Tests are located in [`test`](test), at the root of this repo.

To run the tests, execute the `test` script defined in [`package.json`](package.json):

```shell
npm test
```

## Getting Help

[Our forums](http://forums.donejs.com) and [Gitter chat](https://gitter.im/donejs/donejs) are the best places to ask questions.

