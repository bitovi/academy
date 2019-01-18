var stealTools = require("steal-tools");
var fsx = require('../../../../fs_extras');
var Q = require('q');
var path = require("path");

/**
 * @parent bit-docs-generate-html/site/default/static
 * @module {function} bit-docs-generate-html/site/default/static/build.js
 *
 * @description The `bit-docs-site` script for building static assets.
 *
 * @signature `build(options, folders)`
 *
 * Copies everything and `steal.js`.
 *
 * @body
 *
 * Gets copied to
 * [bit-docs-generate-html/site/static/build/buildHash/build.js].
 */
module.exports = function(options, folders){
	var copyDir = function(name){
		return fsx.mkdirs(path.join(folders.dist,name)).then(function(){
			return fsx.exists(path.join(folders.build,name)).then(function(exists){
				if(exists) {
					return fsx.copy(path.join(folders.build,name), path.join(folders.dist,name));
				}
			});
		});
	};

	var staticDistPromises = [];
	if(options.html && options.html.staticDist){
		options.html.staticDist.forEach(function(dist){
			if(!path.isAbsolute(dist)){
				dist = path.join(process.cwd(), dist);
			}
			staticDistPromises.push(fsx.copyFrom(dist, folders.dist));
		});
	}

	if(options.devBuild) {
		// copy all dependencies
		staticDistPromises.push(fsx.copy(path.join(folders.build), path.join(folders.dist)));
		// copy everything and steal.js
		return Q.all(staticDistPromises);
	} else {

		// run steal-tools and then copy things
		return stealTools.build({
			config: __dirname+"/package.json!npm",
			main: "bit-docs-site/static"
		},{
			minify: options.minifyBuild === false ? false : true,
			quiet: options.debug ? false : true,
			debug: options.debug ?  true : false,
			bundleAssets: true
		}).then(function(){
			if(options.debug) {
				console.log("BUILD: Copying build to dist.");
			}

			staticDistPromises.push(fsx.copy(path.join(folders.build, "dist"), path.join(folders.dist)));
			// moving images over too
			staticDistPromises.push(fsx.copy(path.join(folders.build, "img"), path.join(folders.dist,"img")));
			staticDistPromises.push(fsx.copy(path.join(folders.build, "scripts"), path.join(folders.dist,"scripts")));

			return Q.all(staticDistPromises);
		});
	}
};
