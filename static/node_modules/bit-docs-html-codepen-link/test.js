var assert = require("assert");
var generate = require("bit-docs-generate-html/generate");
var path = require("path");
var fs = require("fs");
var codepenData = require("./codepen-data");

var Browser = require("zombie");
var connect = require("connect");

var open = function(url, callback, done) {
	var server = connect().use(connect.static(path.join(__dirname))).listen(8081);
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

describe("bit-docs-html-codepen-link", function() {
	it("basics works", function(done) {
		this.timeout(60000);

		var docMap = Promise.resolve({
			index: {
				name: "index",
				demo: "path/to/demo.html",
				body: fs.readFileSync(__dirname + "/test-demo.md", "utf8"),
				codepen: [
					["can", "//unpkg.com/can@^5.0.0-pre.1/core.mjs"]
				]
			}
		});

		generate(docMap, {
			html: {
				dependencies: {
					"bit-docs-html-codepen-link": __dirname,
					"bit-docs-tag-demo": "^0.5.3"
				}
			},
			dest: path.join(__dirname, "temp"),
			parent: "index",
			forceBuild: true,
			minifyBuild: false
		}).then(function() {
			open("temp/index.html", function(browser, close) {
				var doc = browser.window.document;
				var createCallData = [];
				browser.window.CREATE_CODE_PEN = function(data) {
					createCallData.push(data);
				};
				var codePens = doc.querySelectorAll('.codepen');

				Array.from(codePens).forEach(function(codePen) {
					codePen.click();
				});
				assert.deepEqual(createCallData, [{
						html: '<my-app></my-app>',
						js: 'import { Component } from "//unpkg.com/can@^5.0.0-pre.1/core.mjs";\nComponent',
						js_module: true,
						editors: '1011',
						css: 'my-app {color: "green";}'
					},
					{
						js: 'import {DefineMap} from "//unpkg.com/can@^5.0.0-pre.1/core.mjs";\nconsole.log( myCounter.count ) //-> 1',
						js_module: true,
						editors: '0011'
					}
				]);

				close();
				done();
			}, done);
		}, done);
	});

	it("is able to ignore scripts with sources", function() {
		var data = codepenData.html(`
			<mock-url></mock-url>
			<bit-json-editor></bit-json-editor>
			<script src="//unpkg.com/mock-url@^5.0.0" type="module"></script>
			<script src="//unpkg.com/bit-json-editor@^5.0.0" type="module"></script>
			<script type="module">
			foo = "bar";
			</script>
			<style>
			bit-json-editor { height: 200px; }
			</style>
		`);
		assert.equal(data.js, 'foo = "bar";')
	});

	it("is able to parse typescript in html", function() {
		var data = codepenData.html(`
			<script type="typescript">
			function greeter(person: string) { return "Hello, " + person; }
			</script>
		`);
		assert.equal(data.js.trim(), 'function greeter(person: string) { return "Hello, " + person; }');
		assert.equal(data.js_pre_processor, 'typescript');
	});

	it("is able to parse jsx in html", function() {
		var data = codepenData.html(`
			<script type="jsx">
			const element = <h1>Hello, world!</h1>;
			</script>
		`);
		assert.equal(data.js.trim(), 'const element = <h1>Hello, world!</h1>;');
		assert.equal(data.js_pre_processor, 'babel');
	});
});
