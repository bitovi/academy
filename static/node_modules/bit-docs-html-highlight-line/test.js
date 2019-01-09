var assert = require("assert");
var generate = require("bit-docs-generate-html/generate");
var path = require("path");
var fs = require("fs");

var Browser = require("zombie");
var connect = require("connect");

var open = function(url, callback, done) {
	var server = connect().use(connect.static(path.join(__dirname, "temp"))).listen(8081);
	var browser = new Browser();
	browser.visit("http://localhost:8081/" + url)
		.then(function() {
			callback(browser, function() {
				server.close();
			});
		}).catch(function(e) {
			server.close();
			done(e);
		});
};

describe("bit-docs-html-highlight-line", function() {
	it("basics works", function(done) {
		this.timeout(60000);

		var docMap = Promise.resolve({
			index: {
				name: "index",
				demo: "path/to/demo.html",
				body: fs.readFileSync(__dirname+"/test-demo.md", "utf8")
			}
		});

		generate(docMap, {
			html: {
				dependencies: {
					"bit-docs-html-highlight-line": __dirname
				}
			},
			dest: path.join(__dirname, "temp"),
			parent: "index",
			forceBuild: true,
			debug: true,
			minifyBuild: false
		}).then(function() {
			open("index.html",function(browser, close) {
				var doc = browser.window.document;

				var lineCodes = doc.querySelectorAll('pre[data-line] code');
				var collapseCodes = doc.querySelectorAll('pre[data-collapse] code');

				assert.ok(lineCodes.length, "there are code blocks with data-line");
				assert.ok(collapseCodes.length, "there are code blocks with data-collapse");

				close();
				done();
			}, done);
		}, done);
	});
});
