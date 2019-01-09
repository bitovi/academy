var template = require("./demo_tpl");

function render(node, docObject) {
	var demoDiv = document.createElement("div");
	demoDiv.className = "demo";
	demoDiv.innerHTML = template;
	var demoSrc =
		(docObject.pathToRoot || "..") +
		"/" +
		(node.dataset ? node.dataset.demoSrc : node.getAttribute("data-demo-src"));
	demoDiv.getElementsByTagName("iframe")[0].src = demoSrc;

	node.innerHTML = "";
	node.appendChild(demoDiv);

	return demoDiv;
}

module.exports = function(node) {
	var docObject = window.docObject || {};
	render(node, docObject);

	var iframe = node.getElementsByTagName("iframe")[0];
	iframe.addEventListener("load", process);

	function process() {
		var demoEl = this.contentDocument.getElementById("demo-html"),
			sourceEl = this.contentDocument.getElementById("demo-source");

		var html = getHTML.call(this, demoEl);
		var js = getJS.call(this, sourceEl);

		if (html && html.trim()) {
			var dataForHtml = node.querySelector("[data-for=html] > pre code, [data-for=html] > div > pre code");
			dataForHtml.innerHTML = escape(html);
			prettify(dataForHtml);

			show(node.querySelector("[data-tab=html]"));
		}

		if (js) {
			var dataForJS = node.querySelector("[data-for=js] > pre code, [data-for=js] > div > pre code");
			dataForJS.innerHTML = escape(js);
			prettify(dataForJS);

			show(node.querySelector("[data-tab=js]"));
		}

		resizeIframe();
		tabs();
	}

	function getHTML(demoEl) {
		var html = demoEl ? demoEl.innerHTML : this.contentWindow.DEMO_HTML;

		if (!html) {
			// try to make from body
			var clonedBody = this.contentDocument.body.cloneNode(true);

			var scripts = [].slice.call(clonedBody.getElementsByTagName("script"));
			scripts.forEach(function(script) {
				if (!script.type || script.type.indexOf("javascript") === -1) {
					script.parentNode.removeChild(script);
				}
			});

			var styles = [].slice.call(clonedBody.getElementsByTagName("style"));
			styles.forEach(function(style) {
				style.parentNode.removeChild(style);
			});

			html = clonedBody.innerHTML;
		}

		if (html[0] === '\n') {
			html = html.slice(1);
		}

		return html;
	}

	function getJS(sourceEl) {
		var source = sourceEl ? sourceEl.innerHTML : this.contentWindow.DEMO_SOURCE;
		if (!source) {
			var scripts = [].slice.call(
				this.contentDocument.querySelectorAll("script")
			);
			// get the first one that is JS
			for (var i = 0; i < scripts.length; i++) {
				if (
					!scripts[i].type ||
					(scripts[i].type.indexOf("javascript") >= 0 && !scripts[i].src)
				) {
					source = scripts[i].innerHTML;
					break;
				}
			}
		}
		return source ? source.trim() : "";
	}

	function show(el) {
		el.style.display = "";
	}

	function hide(el) {
		el.style.display = "none";
	}

	function tabs() {
		node.querySelector("ul").addEventListener("click", function(ev) {
			var el = ev.target;
			if (el.className === "tab") {
				toggle(el.dataset ? el.dataset.tab : el.getAttribute("data-tab"));
			}
		});
		toggle("demo");

		function toggle(tabName) {
			each(".tab", function(el) {
				if (el.classList) {
					el.classList.remove("active");
				} else {
					el.className = "tab";
				}
			});

			each(".tab-content", hide);
			each(".tab[data-tab='" + tabName + "']", function(el) {
				if (el.classList) {
					el.classList.add("active");
				} else {
					el.className = "tab active";
				}
			});
			each("[data-for='" + tabName + "']", show);
		}

		function each(selector, cb) {
			var tabs = [].slice.call(node.querySelectorAll(selector));
			tabs.forEach(cb);
		}
	}

	function escape(txt) {
		txt = txt.replace(/</g, "&lt;");
		return txt;
	}

	function prettify(el) {
		if (typeof Prism === "undefined") {
			return;
		}

		Prism.highlightElement(el);
	}

	// Given the content height and the compute styles of the element,
	// compute the total height of the box
	function getTotalHeight(height, computed) {
		return height +
			parseInt(computed.marginTop, 10) +
			parseInt(computed.marginBottom, 10) +
			parseInt(computed.borderTopWidth, 10) +
			parseInt(computed.borderBottomWidth, 10) +
			parseInt(computed.paddingTop, 10) +
			parseInt(computed.paddingBottom, 10);
	}
	function resizeIframe() {
		var frame = node.getElementsByTagName("iframe")[0];
		var computed = getComputedStyle(frame);

		if (!frame.contentDocument || !frame.contentDocument.body) {
			return;
		}

		// compute height tolerance range
		var tolerance = 5; // pixels
		var desiredHeight = getTotalHeight(
			frame.contentDocument.body.scrollHeight,
			computed
		);
		var low = desiredHeight - tolerance;
		var high = desiredHeight + tolerance;

		// Setting the height causes the next resizeIframe call to get a different
		// height reading (lower); The range/tolerance logic is added to prevent
		// the continous shrinking of the iframe
		var currentHeight = parseInt(computed.height, 10);
		if (currentHeight < low || currentHeight > high) {
			iframe.style.height = Math.min(high, 600) + "px";
		}

		setTimeout(resizeIframe, 1000);
	}
};
