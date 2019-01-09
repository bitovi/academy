var tags = require("./tags");

/**
 * @parent plugins
 * @module {function} bit-docs-html-highlight-line
 * @group bit-docs-html-highlight-line/tags tags
 * @group bit-docs-html-highlight-line/static static
 *
 * @description Adds a `@highlight` tag. Needs to be used after [bit-docs-prettify].
 *
 * @body
 *
 * This plugin registers onto these hooks:
 *   - `tags`
 *   - `html`
 * 
 * Registering the `tags` hook adds the
 * [bit-docs-html-highlight-line/tags/highlight] tag.
 * 
 * Registering the `html` hook adds a static JavaScript file used to do the
 * highlighting [bit-docs-html-highlight-line/highlight-line.js].
 */
module.exports = function(bitDocs){
	var pkg = require("./package.json");
	var deps = {};

	deps[pkg.name] = pkg.version;

	bitDocs.register("html", {
		dependencies: deps
	});

	bitDocs.register("tags", tags);
};
