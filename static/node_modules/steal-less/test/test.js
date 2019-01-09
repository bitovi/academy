QUnit.module("steal-less plugin");
var asyncTest = QUnit.asyncTest;

var makeIframe = function(src){
	var iframe = document.createElement('iframe');
	window.removeMyself = function(){
		delete window.removeMyself;
		document.body.removeChild(iframe);
	};
	document.body.appendChild(iframe);
	iframe.src = src;
};

asyncTest("set options to less plugin", function(){
	makeIframe("less_options/site.html");
});

asyncTest("less loads in the right spot", function(){
	makeIframe("less_imports/dev.html");
});

asyncTest("less loads imports that include locate:// paths", function(){
	makeIframe("less_tilde/dev.html");
});

asyncTest("Get good error messages on 404s", function() {
	makeIframe("less_error/dev.html");
})

QUnit.start();
