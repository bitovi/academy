/**
 * @parent bit-docs-tag-demo/tags
 * @module {bit-docs-process-tags/types/tag} bit-docs-tag-demo/tags/demo @demo
 * 
 * @description Placeholder for an application demo.
 * 
 * @signature `@demo PATH [HEIGHT]`
 * 
 * @codestart javascript
 * /**
 *  * @demo demos/example.html 300
 *  *|
 * @codeend
 * 
 * @param {String} PATH The path to a `.html` file.
 * 
 * @param {Number} [HEIGHT] The height of the html page. If a height is not
 * provided, the height is determined as the content of the body.
 * 
 * @body
 * 
 * ## Specifying the HTML and JS source
 * 
 * By default, `@demo` uses the html of the body minus any script tags as the
 * HTML source. This can be changed by:
 * 
 *  - Adding an element with `id="demo-html"` or 
 *    setting `window.DEMO_HTML` to the source text.
 *  - Adding `id="demo-source"` to a script tag or
 *    setting `window.DEMO_SOURCE` to the source JS.
 * 
 * ### Example
 * 
 * An example demo file might look like:
 * 
 * ```html
 * <div id="demo-html"><b>Hello world!</b></div>
 * <script id="demo-source">
 *   var div = document.createElement("div");
 *   div.textContent = "it worked!";
 *   document.body.appendChild(div);
 * </script>
 * ```
 * 
 * That gets used like:
 * 
 * ```js
 * @@demo demos/example.html
 * ```
 * 
 * Which gets translated to:
 * 
 * ```html
 * @demo demos/example.html
 * ```
 * 
 * And renders like:
 * 
 * @demo demos/example.html
 */
exports.demo = {
	add: function(  line, curData, scope, objects, currentWrite ) {
		var m = line.match(/^\s*@demo\s*([\w\.\/\-\$]*)\s*([\w]*)/)
		if ( m ) {
			var src = m[1] ? m[1].toLowerCase() : '';
			var heightAttr = m[2].length > 0 ? " data-demo-height='" + m[2] + "'" : '';
			
			

			var cd =  ( curData && curData.length !== 2),
				cw = (currentWrite || "body"),
				html = "<div class='demo_wrapper' data-demo-src='" + src + "'" + heightAttr + "></div>\n";
			
			
			// use curData if it is not an array
			var useCurData = cd && (typeof curData.description === "string") && !curData.body;

			if(useCurData) {
				
				curData.description += html;
			} else {
				this.body += html;
			}
			
		}
	}
};
