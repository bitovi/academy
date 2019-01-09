/**
 * @parent plugins
 * @module {function} bit-docs-prettify
 * @group bit-docs-prettify/static static
 *
 * @description A bit-docs plugin that makes source-code snippets in HTML prettier.
 *
 * @body
 *
 * This plugin registers onto the `html` hook.
 *
 * Registering the `html` hook adds a static JavaScript file
 * [bit-docs-prettify/prettify.js] that will go through every `<code>` element
 * on the page applying
 * [prism](https://www.npmjs.com/package/prismjs).
 */
module.exports = function(bitDocs) {
	var pkg = require("./package.json");

	var dependencies = {};
	dependencies[pkg.name] = pkg.version;

	bitDocs.register("html", {
		dependencies: dependencies
	});
}
