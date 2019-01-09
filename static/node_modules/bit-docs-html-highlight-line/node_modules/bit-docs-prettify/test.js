var generate = require("bit-docs-generate-html/generate");
var path = require("path");
var fs = require("fs");
var assert = require("assert");

var Browser = require("zombie");
var connect = require("connect");

function zombieFixes() {
	Object.defineProperty(HTMLElement.prototype, 'classList', {
		get: function() {
			var parent = this;

			var classList = parent.className.split(' ');
			classList.contains = classList.includes;
			classList.add = function(token) {
				this.push(token);
				parent.className = this.join(' ');
			};

			return classList;
		}
	});
}
zombieFixes = zombieFixes.toString() + "\nzombieFixes();\n\n"

var open = function(url, callback, done) {
	var stealPath = path.join(__dirname, "temp", "static", "node_modules", "steal", "steal.production.js");
	fs.writeFileSync(stealPath, zombieFixes + fs.readFileSync(stealPath, "utf8"));

	var indexPath = path.join(__dirname, "temp", "index.html");
	fs.writeFileSync(indexPath, fs.readFileSync(indexPath, "utf8").replace("</head>", "<script src='https:\/\/cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script></head>"));


	var server = connect().use(connect.static(path.join(__dirname, 'temp'))).listen(8081);
	var browser = new Browser();

	browser.visit("http://localhost:8081/" + url)
		.then(function() {
			callback(browser, function() {
				server.close();
			});
		})
		.catch(function(e) {
			server.close();
			done(e);
		})
	;
};

describe("bit-docs-prettify", function() {
	it("basics work", function(done) {
		this.timeout(30000);

		var docMap = Promise.resolve({
			index: {
				name: "index",
				body: "```javascript\nvar str = 'hello world';\n```\n\n```css\nbody {\n  margin: 0;\n  background: purple;\n}\n```\n\n```shell\npwd\n```\n\n```\n// some misc code\n```"
			}
		});

		generate(docMap, {
			html: {
				dependencies: {
					"bit-docs-prettify": __dirname
				}
			},
			dest: path.join(__dirname, "temp"),
			parent: "index",
			forceBuild: true
		})
			.then(function() {
				open("index.html", function(browser, close) {
					var codes = browser.window.document.getElementsByTagName("code");

					for (var i = 0; i < codes.length; i++) {
						assert.ok(codes[i].className.includes("language-"), "has a language");

						if (codes[i].parentNode.nodeName === "PRE") {
							assert.ok(codes[i].parentNode.className.includes("language-"), "parent has a language");
						}
					}

					close();
					done();
				}, done);
			})
			.catch(function(err) {
				console.log(err);
				done(err);
			})
		;
	});
});
