
import QUnit from "steal-qunit";
import {getCanvasForUrl, getCanvasForImage, diff, resizeCanvas} from "./canvas-test";


function makeBoxForCanvas(canvas, title) {
	var div = document.createElement("div");
	div.style.display = "inline-block";
	div.style.border = "solid 1px black";
	var paragraph = document.createElement("p");
	paragraph.textContent = title;
	div.appendChild(paragraph)

	div.appendChild(canvas);
	return div;
}

QUnit.asyncTest("style-guide looks right", function(){
	Promise.all([
		getCanvasForUrl("../doc/training/style-guide.html"),
		getCanvasForImage("./style-guide-reference.png")
	])
	.then(function([iframeCanvas, imageCanvas]){

		var diffCanvas = diff(iframeCanvas, imageCanvas);

		QUnit.ok(!diffCanvas, "Images are equal");

		if(diffCanvas) {
			resizeCanvas(diffCanvas, 0.5);
			document.body.appendChild(makeBoxForCanvas(diffCanvas, "Difference:"));

			resizeCanvas(iframeCanvas, 0.5);
			document.body.appendChild(makeBoxForCanvas(iframeCanvas, "Current Rendering:"));

			resizeCanvas(imageCanvas, 0.5);
			document.body.appendChild(makeBoxForCanvas(imageCanvas, "Reference Image:"));
		}



		QUnit.start();
	})
});
