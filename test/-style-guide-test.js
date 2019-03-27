
import QUnit from "steal-qunit";
import {compareToSnapshot, getCanvasForImage, dataEqual, getCanvasForUrl, downloadLink} from "./canvas-test";


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

	next();

	function next(){
		compareToSnapshot({
			url: "../doc/training/style-guide.html",
			width: 1000,
			snapshotDir: "./",
			snapshotPrefix: "style-guide",
		}).then(function(){
			QUnit.ok(true, "equal");
			QUnit.start();
		}, function(err) {
			var details = document.createElement("details");
			details.innerHTML = "<summary>style-guide looks right</summary>";
			details.appendChild(err.html);
			document.body.appendChild(details);
			QUnit.ok(false, "images do not match");
			QUnit.start();
		});
	}

	/*


	/*

	Promise.all([
		getCanvasForUrl("../doc/training/style-guide.html"),
		getCanvasForImage("./style-guide-reference.png")
	])
	.then(function([iframeCanvas, imageCanvas]){

		var diffCanvas = diff(iframeCanvas, imageCanvas);

		QUnit.ok(!diffCanvas, "Images are equal");

		if(diffCanvas) {
			//var display = displayForDiff(diffCanvas, iframeCanvas, imageCanvas)


			document.body.appendChild( downloadLink(iframeCanvas, "foo-bar.png") )
			resizeCanvas(diffCanvas, 0.5);
			document.body.appendChild(makeBoxForCanvas(diffCanvas, "Difference:"));

			resizeCanvas(iframeCanvas, 0.5);
			document.body.appendChild(makeBoxForCanvas(iframeCanvas, "Current Rendering:"));

			resizeCanvas(imageCanvas, 0.5);
			document.body.appendChild(makeBoxForCanvas(imageCanvas, "Reference Image:"));
		}



		QUnit.start();
	})*/
});
