import html2canvas from "./html2canvas";
import {detect} from "detect-browser";



// ## Basic Helpers
export function getIndex(data, x, y) {
	return (y * data.width * 4) + x * 4;
}
export function getXYChoord(data, index) {
	return [
		index % (data.width * 4),
		Math.floor(index / (data.width * 4))

	]
}
export function ave(num1, num2) {
	return Math.floor((num1+num2) / 2 )
}
export function getPixel(data, x, y) {
	var index = getIndex(data, x, y);
	return data.data.slice(index, index+4)
}
export function pixelEqual(p1, p2) {
	return p1[0] === p2[0] && p1[1] === p2[1] && p1[2] === p2[2] && p1[3] === p2[3];
}

// ## Canvas  utils

var tempCanvas = document.createElement("canvas");
var tempCtx = tempCanvas.getContext("2d");
export function resizeCanvas(canvas, scale) {
	var cw = tempCanvas.width = canvas.width;
	var ch = tempCanvas.height = canvas.height;


	tempCtx.drawImage(canvas,0,0);

	canvas.width *= scale;
	canvas.height *= scale;
	canvas.style.width = "";
	canvas.style.height = "";
	var ctx=canvas.getContext('2d');
	ctx.drawImage(tempCanvas,0,0,cw,ch,0,0, cw*scale,ch*scale );
}

export function copyToWidth(canvas, newWidth) {
	var newHeight = canvas.height * ( newWidth / canvas.width );
	var newCanvas = document.createElement("canvas");
	newCanvas.width = newWidth;
	newCanvas.height = newHeight;
	var newCtx = newCanvas.getContext("2d");

	newCtx.drawImage(canvas,0,0,canvas.width,canvas.height,0,0, newWidth,newHeight );
	return newCanvas;
}

function getImageData(image) {
	if(image.getContext) {
		var ctx = image.getContext('2d');
		return ctx.getImageData(0,0, image.width, image.height);
	} else {
		return image;
	}
}


// ## Image or Canvas comparisons

export function dataEqual(data1, data2) {
	var len = data1.data.length;
	for(var i = 0 ; i < len; i++) {
		if(data1.data[i] !== data2.data[i]) {
			console.log("difference at ",getXYChoord(data1, i));
			return false;
		}
	}
	return true;
}



export function diff(newImage, oldImage) {
	newImage = getImageData(newImage);
	oldImage = getImageData(oldImage);

	// find the minimal dimension
	var canvas = document.createElement("canvas");

	var maxWidth = Math.max(newImage.width, oldImage.width),
		minWidth = Math.min(newImage.width, oldImage.width),
		minHeight = Math.min(newImage.height, oldImage.height),
		maxHeight = Math.max(newImage.height, oldImage.height);

	canvas.width = maxWidth;
	canvas.height = maxHeight;
	var ctx = canvas.getContext('2d');
	var diffOut = ctx.createImageData(maxWidth, maxHeight);
	var equal = true;

	for(var y = 0; y < maxHeight; y++) {
		for(var x = 0; x < maxWidth; x++) {

			var newPixel = getPixel(newImage, x, y);
			var oldPixel = getPixel(oldImage, x, y);
			var index = getIndex(diffOut, x, y);

			if( !pixelEqual(newPixel, oldPixel) ) {
				equal = false;
				// average numbers and max out red ...
				diffOut.data[index] = 255;
				diffOut.data[index+1] = ave(newPixel[1] , oldPixel[1]);
				diffOut.data[index+2] = ave(newPixel[2] , oldPixel[2]);
				diffOut.data[index+3] = 255;
			} else {
				diffOut.data[index] = newPixel[0];
				diffOut.data[index+1] = newPixel[1];
				diffOut.data[index+2] = newPixel[2];
				diffOut.data[index+3] = newPixel[3];
			}
		}
	}
	if(equal) {
		return
	} else {
		ctx.putImageData(diffOut, 0, 0);
		return canvas;
	}
}

export function downloadLink(canvas, title, text) {
	var anchor = document.createElement("a");
	anchor.setAttribute("download", title);
	var url = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	//console.log(url);
	anchor.setAttribute("href", url );
	anchor.textContent = text;
	return anchor;
}

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

function getWidth(){
	return Math.max(
		document.body.scrollWidth,
		document.documentElement.scrollWidth,
		document.body.offsetWidth,
		document.documentElement.offsetWidth,
		document.documentElement.clientWidth
	);
}

export function diffContent(diffCanvas, newCanvas, oldCanvas, imageName) {
	var width = Math.floor( getWidth() / 3 ) - 50;

	// get links
	var newCanvasDownload = downloadLink(newCanvas,imageName, "download new "+imageName);

	var diffSized = copyToWidth(diffCanvas, width);
	var newSized = copyToWidth(newCanvas, width);
	var oldSized = copyToWidth(oldCanvas, width);

	var diffContent = makeBoxForCanvas(diffSized, "Difference:");
	var newContent = makeBoxForCanvas(newSized, "Current Rendering:");
	newContent.querySelector("p").appendChild(newCanvasDownload);
	var oldContent = makeBoxForCanvas(oldSized, imageName);

	var div = document.createElement("div");
	div.appendChild(diffContent);
	div.appendChild(newContent);
	div.appendChild(oldContent);
	return div;
}

/**
{
	url: "../doc/training/style-guide.html",
	width: 1000,
	snapshotDir: "./",
	snapshotPrefix: "style-guide"
}
 */
export function compareToSnapshot(options) {

	var htmlPromise = getCanvasForUrl(options.url);
	return Promise.all([
		getCanvasForUrl(options.url),
		findImage(options)
	]).then(function(results){
		var iframeCanvas = results[0];
		var imageCanvas = results[1].canvas;
		var imageName = results[1].name;

		var diffCanvas = diff(iframeCanvas, imageCanvas);
		if(diffCanvas) {
			return Promise.reject({
				html: diffContent(diffCanvas, iframeCanvas, imageCanvas, imageName),
				imageName: imageName
			});
		} else {
			return {imageName: imageName}
		}
	}, function(err){
		return htmlPromise.then(function(iframeCanvas){

			/*var image = getImageData(iframeCanvas);
			var pixel = getPixel(image, 221, 54);
			var eq = pixelEqual(pixel, [238, 238, 239, 255]);*/

			var imageName = err.attempts[0];
			var newCanvasDownload = downloadLink(iframeCanvas,imageName, imageName);
			var p = document.createElement("p");
			p.textContent = "There is no snapshot. Download the snapshot by right-clicking ";
			p.appendChild(newCanvasDownload);
			p.append(" and select 'Save Link As...'.");
			return Promise.reject({
				attempts: err.attempts,
				html: p
			})
		})

	})
}


export function findImage(options){
	var browser = detect();

	var attempts = [
		options.snapshotPrefix+"-"+options.width+"-"+browser.name+".png",
		options.snapshotPrefix+"-"+options.width+".png",
		options.snapshotPrefix+".png"
	];

	var base = Promise.reject();

	attempts.forEach(function(name){
		base = base.catch(function(err){
			return getCanvasForImage(options.snapshotDir+name).then(function(canvas){
				return {canvas: canvas, name: name}
			})
		})
	});

	return base.catch(function(){
		return Promise.reject({
			attempts: attempts
		})
	});
}




// ## Helpers that get canvases
export function getCanvasForUrl(url) {
	return new Promise(function(resolve, reject){
		var div = document.createElement("div");
		div.style.position = "fixed";
		div.style.top = div.style.left = "-1000px"
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
						setTimeout(function(){
							document.body.removeChild(div);
						},13);

					});

			},13)

		}
		div.appendChild(iframe);
	})

}

export function getCanvasForImage(url) {
	return new Promise(function(resolve, reject){
		var image = new Image();

		image.onload = function(){
			var canvas = document.createElement("canvas");
		    //document.body.appendChild(canvas);

		    canvas.width  = image.width;
		    canvas.height = image.height;

		    var context = canvas.getContext("2d");

		    context.drawImage(image, 0, 0);
			resolve(canvas);
		}
		image.onerror = reject;

		image.src = url;


	});


}
