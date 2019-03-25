import html2canvas from "./html2canvas";
import QUnit from "steal-qunit";


function getCanvasForUrl(url) {
	return new Promise(function(resolve, reject){
		var div = document.createElement("div");
		div.style.position = "fixed";
		div.style.top = div.style.left = "0"
		div.style.height = "400px";
		div.style.width = "1000px";
		document.body.appendChild(div);
		//var fixture = document.getElementById("qunit-fixture");

		var iframe = document.createElement("iframe");
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.style.backgroundColor = "white";
		iframe.src = url;
		iframe.onload = function(){
			console.log("load");
			setTimeout(function(){
				html2canvas(iframe.contentWindow.document.body, {
					allowTaint: true,
					foreignObjectRendering: true,
					useCORS: true,
					windowWidth: 1000,
					width: 1000,
					devicePixelRatio: 1
				})
					.then(resolve, reject).then(function(){
						div.removeChild(iframe);
					});

			},13)

		}
		div.appendChild(iframe);
	})

}


function getCanvasForImage(url) {
	return new Promise(function(resolve, reject){
		var image = new Image();

		image.onload = function(){
			var canvas = document.createElement("canvas");
		    document.body.appendChild(canvas);

		    canvas.width  = image.width;
		    canvas.height = image.height;

		    var context = canvas.getContext("2d");

		    context.drawImage(image, 0, 0);
			resolve(canvas);
		}

		image.src = url;


	});


}


QUnit.asyncTest("style-guide looks right", function(){
	Promise.all([
		getCanvasForUrl("../doc/training/style-guide.html"),
		getCanvasForImage("./style-guide-reference.png")
	])
	.then(function([iframeCanvas, imageCanvas]){
		var iframeContext = iframeCanvas.getContext('2d');
		var iframeData = iframeContext.getImageData(0,0, iframeCanvas.width, iframeCanvas.height);

		var imageContext = imageCanvas.getContext('2d');

		var imageData = imageContext.getImageData(0,0, imageCanvas.width, imageCanvas.height);
		QUnit.equal(iframeData.data.length, imageData.data.length, "images the same size");
		var len = iframeData.data.length;
		var equal = true;
		for(var i = 0 ; i < len; i++) {
			if(iframeData.data[i] !== imageData.data[i]) {
				equal = false;
				break;
			}
		}
		QUnit.ok(equal, "images are equal");
		QUnit.start();
	})
});
