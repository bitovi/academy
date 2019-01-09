require("./prettify.less");

require("./prism-config");
var Prism = require("prismjs");
window.Prism = Prism;
require("prismjs/themes/prism-coy.css");

require("prismjs/plugins/line-numbers/prism-line-numbers");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

require("prismjs/plugins/previewers/prism-previewers");
require("prismjs/plugins/previewers/prism-previewers.css");

require("prismjs/plugins/command-line/prism-command-line");
require("prismjs/plugins/command-line/prism-command-line.css");

require("prismjs/plugins/toolbar/prism-toolbar");
require("prismjs/plugins/toolbar/prism-toolbar.css");
require("prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard");

require("prismjs/components/prism-typescript");
require("prismjs/components/prism-jsx");

Prism.languages.insertBefore('javascript', 'template-string', {
	'html-template-string': {
		pattern: /`(?:[\s\S])*<[a-z-]+(?:\s+[^<>]*)?>(?:[\s\S])*`/,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			rest: Prism.languages.html
		}
	}
});

module.exports = function() {
	var codes = document.getElementsByTagName("code");
	for (var i = 0; i < codes.length; i++) {
		var code = codes[i];

		if (code.textContent.slice(-1) === "\n") {
			code.textContent = code.textContent.slice(0, -1);
		}

		if (code.parentNode.nodeName.toUpperCase() === "PRE") {
			code.parentNode.className += " line-numbers";

			if (code.className.includes("language-shell")) {
				code.parentNode.className += " command-line";
			}

			if (!code.className.includes("language-")) {
				code.className += " language-unknown";
			}
		}
	}

	window.requestAnimationFrame(Prism.highlightAll);
};
