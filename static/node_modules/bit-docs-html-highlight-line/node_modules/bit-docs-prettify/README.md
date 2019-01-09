# bit-docs-prettify

A [bit-docs](https://github.com/bit-docs/bit-docs) plugin that makes source-code snippets in HTML prettier.

Powered by <https://github.com/google/code-prettify>.

A working demonstration is available at <https://glitch.com/edit/#!/bit-docs-prettify>.

## Usage

Add `bit-docs-prettify` as a dependency to your project's `package.json`, under the `bit-docs` section:

```json
{
  "name": "your-project",
  ...
  "bit-docs": {
    "dependencies": {
      "bit-docs-prettify": "*"
    },
    ...
  }
}
```

Now use the `bit-docs` command-line tool to install the added plugin dependency:

```shell
./node_modules/bit-docs/bin/bit-docs
```

Your project should now support syntax highlighting of source-code snippets in the following languages:

    javascript, js, clike, css, markup, xml, html, mathml, svg

Use the following HTML code to trigger syntax highlighting of a source-code snippet:

```html
<pre><code class="language-javascript">...</code></pre>
```

You can replace `language-javascript` with an option from the list of supported languages above, like `language-js`.

## Contributing

Want to help make `bit-docs-prettify` even better? See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Looking for a changelog? Try the [releases page on GitHub](https://github.com/bit-docs/bit-docs-prettify/releases).
