var plugin = require("less-plugin");
var steal = require("@steal");
var loader = require("@loader");
var global = loader.global;
var StealLessManager = plugin.StealLessManager;

function extend(a, b) {
	for(var p in b) {
		a[p] = b[p];
	}
	return a;
}

extend(exports, plugin);

var doXHR = StealLessManager.prototype.doXHR;
StealLessManager.prototype.doXHR = function(url, type, callback, errback) {
	var sources = global.LESS_SOURCES || [], source;
	for(var p in sources) {
		source = sources[p];
		if(source.exp.test(url)) {
			callback(source.code, new Date());
			return;
		}
	}
	return doXHR.apply(this, arguments);
};

exports.instantiate = function(load){
	return {
		deps: [],
		execute: function(){
			return loader.newModule({});
		}
	};
};
