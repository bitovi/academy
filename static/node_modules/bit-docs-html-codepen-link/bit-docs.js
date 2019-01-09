var tags = require("./tags");

module.exports = function(bitDocs){
	var pkg = require("./package.json");
	var deps = {};

	deps[pkg.name] = pkg.version;

	bitDocs.register("html", {
		dependencies: deps
	});

	bitDocs.register("tags", tags);
};
