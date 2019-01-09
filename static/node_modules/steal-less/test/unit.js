var loader = require("@loader");
var helpers = require("./helpers")(loader);
var QUnit = require("steal-qunit");

QUnit.module("live-reload with deeply nested modules", {
	teardown: function(){
		helpers.restore();
		loader.delete("foo.less!$less");
		loader.delete("qux.less!$less");
	}
});

QUnit.test("dependencies are in the includedDeps", function(assert){
	var done = assert.async();

	helpers.provide("foo.less!$less", "@import './bar.less';");
	helpers.provideLess("bar.less", "@import './baz.less';");
	helpers.provideLess("baz.less", "body { background: green; }");

	loader.import("foo.less")
	.then(function(){
		var load = loader.getModuleLoad("foo.less!$less");
		var deps = load.metadata.includedDeps;

		assert.ok(Array.isArray(deps), "got an array of deps");
		assert.equal(deps.length, 2, "there are two nested deps");
		assert.ok(/bar.less/.test(deps[0]), "first is bar.less");
		assert.ok(/baz.less/.test(deps[1]), "second is baz.less");

		done();
	}, function(err){
		assert.ok(!err, err && err.stack);
		done(err);
	});
});

QUnit.test("less fileCache is used if not live reloading", function(assert){
	var done = assert.async();

	helpers.provide("foo.less!$less", "@import './bar.less';");
	helpers.provideLess("bar.less", "@import './baz.less';");
	helpers.provideLess("baz.less", "body { background: green; }");

	loader.import("foo.less")
	.then(function(){
		helpers.provide("qux.less!$less", "@import './bar.less';");
		helpers.provideLess("baz.less", "body { background: red; }");

		// Shim live-reload so the plugin thinks it's installed
		helpers.mockLiveReload(false);

		return loader.import("qux.less");
	}).then(function(){
		var load = loader.getModuleLoad("qux.less!$less");
		var source = load.source;

		assert.ok(/background\: green/.test(source), "got the correct source");
		done();
	}, function(err){
		assert.ok(!err, err && err.stack);
		done(err);
	});
});

QUnit.test("less fileCache is not used if live reloading", function(assert){
	var done = assert.async();

	helpers.provide("foo.less!$less", "@import './bar.less';");
	helpers.provideLess("bar.less", "@import './baz.less';");
	helpers.provideLess("baz.less", "body { background: green; }");

	loader.import("foo.less")
	.then(function(){
		helpers.provide("qux.less!$less", "@import './bar.less';");
		helpers.provideLess("baz.less", "body { background: red; }");

		// Shim live-reload so the plugin thinks it's installed
		helpers.mockLiveReload(true);

		return loader.import("qux.less");
	}).then(function(){
		var load = loader.getModuleLoad("qux.less!$less");
		var source = load.source;

		assert.ok(/background\: red/.test(source), "got the correct source");
		done();
	}, function(err){
		assert.ok(!err, err && err.stack);
		done(err);
	});
});

QUnit.test("steal-less' file cache is not used if live reloading", function(assert){
	var done = assert.async();

	helpers.provide("foo.less!$less", "body { background: green; }");

	loader.import("foo.less")
	.then(function(){
		loader.delete("foo.less!$less");
		helpers.provide("foo.less!$less", "body { background: red; }");

		helpers.mockLiveReload(true);

		return loader.import("foo.less");
	})
	.then(function(){
		var load = loader.getModuleLoad("foo.less!$less");
		var source = load.source;

		assert.ok(/background\: red/.test(source), "got the correct source");
		assert.ok(!loader._lessSources[load.address], "source not cached");
		done();
	}, function(err){
		console.log("ARG", err);
		assert.ok(!err, err & err.stack);
		done(err);
	});
});
