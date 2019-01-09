var demoFrame = require("./demo_frame");

module.exports = function(){
	var demos = [].slice.call(document.getElementsByClassName("demo_wrapper"));
	demos.forEach(demoFrame);
};
