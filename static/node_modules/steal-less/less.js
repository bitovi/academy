var css = require("$css");
var loader = require("@loader");
var lessEngine = require("./less-engine");

exports.instantiate = css.instantiate;

var options = loader.lessOptions || {};

if(lessEngine.options) {
	lessEngine.options.async = true;
}

// default optimization value.
options.optimization |= lessEngine.optimization;

// We store sources so files are only fetched once and shared between
// Steal and the Less File Manager
exports.fetch = function(load, fetch){
	var p = Promise.resolve(false);
	if(this.liveReloadInstalled) {
		var loader = this, args = arguments;
		p = loader.import("live-reload", { name: module.id })
		.then(function(liveReload){
			return liveReload.isReloading();
		});
	}

	var loader = this, args = arguments;

	return p.then(function(isReloading){
		if(isReloading) {
			removeSource(load.address);
			return fetch.apply(loader, args);
		}

		var p = getSource(load.address);
		if(p) {
			return p;
		}

		p = fetch.call(loader, load);
		addSource(load.address, p);
		return p;
	});
};

exports.translate = function(load) {
	var loader = this;
	var address = load.address.replace(/^file\:/,"");
	var useFileCache = true;

	var pathParts = (address+'').split('/');
	pathParts[pathParts.length - 1] = ''; // Remove filename

	if (typeof window !== 'undefined') {
		pathParts = (load.address+'').split('/');
		pathParts[pathParts.length - 1] = ''; // Remove filename
	}

	function renderLess() {
		var filename = address;
		if(loader._nodeRequire) {
			filename = loader._nodeRequire("path").resolve(address);
		}

		var renderOptions = {
			filename: filename,
			useFileCache: useFileCache
		};
		var pluginPromises = [];

		for (var prop in options){
			if( prop !== 'plugins') {
				renderOptions[prop] = options[prop];
			}
		}
		renderOptions.paths = (options.paths || []).concat(pathParts.join('/'));

		renderOptions.plugins = [];
		if(options.plugins) {
			options.plugins.forEach(function(plugin) {
				if(typeof plugin === 'string') {
					pluginPromises.push(loader.import(plugin).then(function(resolvedPlugin){
						renderOptions.plugins.push(resolvedPlugin);
					}));
				}
			});
		}
		if (stealLessPlugin !== undefined) {
			renderOptions.plugins.push(stealLessPlugin);
		}

		renderOptions.relativeUrls = options.relativeUrls === undefined ? true : options.relativeUrls;

		var done = function(output) {
			// Put the source map on metadata if one was created.
			load.metadata.map = output.map;
			load.metadata.includedDeps = output.imports || [];
			return output.css;
		};

		return Promise.all(pluginPromises).then(function(){
			var p = Promise.resolve(
				lessEngine.render(load.source, renderOptions)
			);
			return p.then(done).then(null, function(err){
				// 404.
				//!steal-remove-start
				if(err.type === "File" && /404/.test(err.message)) {
					if(loader._addSourceInfoToError) {
						var fn = err.filename.split("/").pop();
						var msg = "The stylesheet [" + fn + "] wasn't able to fetch a dependency.\n" +
							"This could be because:\n\n" +
							"\t - The dependency hasn't been saved yet.\n" +
							"\t - The path is incorrect.\n\n" +
							"The below snippet shows the file we were unable to fetch.\n" +
							"See https://stealjs.com/docs/StealJS.error-messages.html#404-not-found for more information.";

						var newError = new Error(msg);
						var pos = { line: err.line, column: err.column };
						return loader._addSourceInfoToError(newError, pos, load, "@import");
					}
				}
				//!steal-remove-end
				return Promise.reject(err);
			});
		});

	}

	if(loader.liveReloadInstalled) {
		return loader["import"]("live-reload", { name: module.id })
		.then(function(reload){
			if(reload.isReloading()) {
				useFileCache = false;
			}
		})
		.then(renderLess, renderLess)
		.catch(function(err) {
			console.error(err.message + " in " + err.filename + ":" + err.line);
			console.dir(err);
		});
	}

	return renderLess();
};
exports.locateScheme = true;
exports.buildType = "css";

// plugin to rewrite locate:// paths in imports
var stealLessPlugin = undefined;
if (lessEngine.FileManager) {
	var FileManager = lessEngine.FileManager;

	function StealLessManager() {
		this.PATTERN = /locate:\/\/([a-z0-9/._@-]*)/ig;
	}

	StealLessManager.prototype = new FileManager();

	StealLessManager.prototype.supports = function(filename) {
		return true;
	};

	StealLessManager.prototype.locate = function(filename, currentDirectory) {
		return Promise.resolve(loader.normalize(filename, currentDirectory))
			.then(function(name){
				return loader.locate({name: name, metadata: {}});
			});
	};

	StealLessManager.prototype.parseFile = function(file) {
		var self = this;
		var promises = [];
		// collect locate promises
		file.contents.replace(self.PATTERN, function (whole, path, index) {
			promises.push(self.locate(path, file.filename.replace(loader.baseURL, '')).then(function(filename) {
				filename = filename.replace(/^file\:/,"");

				return {
					str: relative(file._directory, filename),
					loc: index,
					del: whole.length
				}
			}));
		});

		return Promise.all(promises).then(function(spliceDefs) {
			for(var i = spliceDefs.length; i--;) {
				var def = spliceDefs[i];
				file.contents = file.contents.slice(0, def.loc) + def.str + file.contents.slice(def.loc + def.del);
			}

			return file;
		});
	};

	StealLessManager.prototype.loadFile = function(filename, currentDirectory, options, environment, callback) {
		var self = this,
			_callback = callback,
			path = (currentDirectory + filename),
			directory = normalizePath(path.substring(0, path.lastIndexOf('/')+1)),
			promise;

		callback = function(err, file) {
			if (err) {
				return _callback.call(self, err);
			}

			file._directory = directory;

			self.parseFile(file).then(function(file) {
				_callback.call(self, null, file);
			});
		};

		promise = FileManager.prototype.loadFile.call(this, filename, currentDirectory, options, environment, callback);

		// when promise is returned we must wrap promise, when one is not, the wrapped callback is used
		if (promise && typeof promise.then == 'function') {
			return promise.then(function(file) {
				file._directory = directory;

				return self.parseFile(file);
			});
		}
	};

	stealLessPlugin = {
		install: function(less, pluginManager) {
			pluginManager.addFileManager(new StealLessManager());
		}
	};

	exports.StealLessManager = StealLessManager;
}

var getSource = function(url){
	return loader._lessSources && loader._lessSources[url];
}

var addSource = function(url, p){
	if(!loader._lessSources) {
		loader._lessSources = {};
	}
	if(!loader._lessSources[url]) {
		loader._lessSources[url] = Promise.resolve(p);
	}
};

var removeSource = function(url){
	if(loader._lessSources) {
		delete loader._lessSources[url];
	}
};

var normalizePath = function(path) {
	var parts = path.split('/'),
		normalized = [];

	for (var i = 0 ; i< parts.length; i++) {
		var part = parts[i];
		if (part != '.') { // ignore './'
			if (part == '..') { // remove part preceding '../'
				normalized.pop();
			} else {
				normalized.push(part);
			}
		}
	}
	return normalized.join('/');
};


var relative = function(base, path){
	var uriParts = path.split("/"),
		baseParts = base.split("/"),
		result = [];

	while ( uriParts.length && baseParts.length && uriParts[0] == baseParts[0] ) {
		uriParts.shift();
		baseParts.shift();
	}

	for (var i = 0 ; i < baseParts.length-1; i++) {
		result.push("../");
	}

	return result.join("") + uriParts.join("/");
};
