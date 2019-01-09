# Contributing

For general contributing guidelines, see the [Contributing Guide on DoneJS.com](https://donejs.com/contributing.html).

## Project Organization

    bit-docs-prettify
    ├── bit-docs.js         # Registers this package into the bit-docs system as a dependency.
    ├── prettify.js         # Bootstraps prism.
    └── test.js             # Creates temp/index.html with <pre><code>var str ='hello world';</code></pre>
                            #   to verify that prettyprint gets applied after a timeout.

## Developing Locally

### Installing the dependencies

Install the packages defined in [`package.json`](package.json):

```shell
npm install
```

### Running the tests

Tests are located in [`test.js`](test.js), at the root of this repo.

To run the tests, execute the `test` script defined in [`package.json`](package.json):

```shell
npm test
```

This will produce a directory and file at `temp/index.html`, containing the source-code snippet in HTML:

```html
<pre><code class="language-javascript">var str = 'hello world';</code></pre>
<pre><code class="language-css">body{ margin: 0; background: purple; }</code></pre>
<pre><code>// some misc code</code></pre>
<p><code>var str = 'hello world';</code>
```

Running the tests will verify that this source-code snippet in HTML is correctly prettified by the plugin.

In [`test.js`](test.js), the [bit-docs-generate-html](https://github.com/bit-docs/bit-docs-generate-html) plugin is generating HTML from the equivalent of this markdown:

    ```javascript
    var str = 'hello world';
    ```

    ```css
    body {
      margin: 0;
      background: purple;
    }
    ```

    ```
    // some misc code
    ```

    `var str = 'hello world';`

That shows how a bit-docs "generator" plugin can generate the right HTML to play nice with `bit-docs-prettify`.

You can open the file in your web browser to see the "pretty" result using `http-server`:

```shell
npm install -g http-server
npm test && http-server
```

Now visit <http://127.0.0.1:8080/temp/index.html>

## Getting Help

[Our forums](http://forums.donejs.com) and [Gitter chat](https://gitter.im/donejs/donejs) are the best places to ask questions.
