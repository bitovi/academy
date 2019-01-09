var tags = require("./tags");

/**
 * @parent plugins
 * @module {function} bit-docs-tag-demo
 * @group bit-docs-tag-demo/tags tags
 *
 * @description Provides an `@demo` tag for embedding HTML, CSS, and JS in an iframe.
 *
 * @body
 *
 * This plugin registers onto these hooks:
 *   - `tags`
 *   - `html`
 *
 * Registering the `tags` hook adds the [bit-docs-tag-demo/tags/demo] tag.
 * 
 * Registering the `html` hook adds a static JavaScript file used to create
 * the tabbed demo widget [bit-docs-tag-demo/demo].
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
