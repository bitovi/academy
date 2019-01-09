// Without these options Less will inject a `body { display: none !important; }`
var less = window.less || (window.less = {});
less.async = true;

module.exports = require("less/dist/less");
