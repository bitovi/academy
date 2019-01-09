/**
 * @parent bit-docs-generate-html/site/default/static
 * @module bit-docs-generate-html/site/default/static/static.js
 *
 * @description The `bit-docs-site` script for including static assets.
 *
 * @body
 * 
 * Gets copied to
 * [bit-docs-generate-html/site/static/build/buildHash/static.js].
 */
var packages = require("./packages");
require("./styles/styles.less!");
window.PACKAGES = packages;
