// Without these options Less will inject a `body { display: none !important; }`
"format cjs";

var global = System.global;
var less = global.less || (global.less = {});
less.async = true;
