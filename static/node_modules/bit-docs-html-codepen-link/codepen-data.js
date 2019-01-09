var scriptRegExp = /<script\s([^>]+)>([\s\S]*?)<\/script>/ig;
var styleRegExp = /<style>([\s\S]*?)<\/style>/i;
var moduleTest = /type=["']([\w\/]+)["']/;
var srcTest = /src=/;
var types = {
	html: function htmlType(text) {

		var result;

		text.replace(scriptRegExp, function(match, attrs, code) {

			var matchTest = attrs.match(moduleTest);

			if (matchTest && !srcTest.test(attrs)) {

				var HTML = text.replace(match, "").trim();
				var CSS;
				var styleResults = HTML.match(styleRegExp);
				if (styleResults) {
					HTML = HTML.replace(styleResults[0], "").trim();
					CSS = styleResults[1].trim();
				}
				if (types[matchTest[1]]) {
					result = types[matchTest[1]](code.trim());
				} else {
					result = types.js(code.trim());
				}
				result.editors = "1011";
				if (HTML) {
					result.html = HTML;
				}
				if (CSS) {
					result.css = CSS;
				}
			}
		});
		return result;
	},
	js: function(text) {
		return {
			js: text,
			js_module: true,
			editors: "0011"
		};
	},
	typescript: function(text) {
		return {
			js: text,
			js_pre_processor: "typescript",
			editors: "0011"
		};
	},
	jsx: function(text) {
		return {
			js: text,
			js_pre_processor: "babel",
			editors: "0011"
		};
	}
};

module.exports = types;
