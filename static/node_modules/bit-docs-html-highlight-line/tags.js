/**
 * @parent bit-docs-html-highlight-line/tags
 * @module {bit-docs-process-tags/types/tag} bit-docs-html-highlight-line/tags/highlight @highlight
 *
 * Highlight the specified code lines.
 *
 * @signature `@highlight LINES[,ONLY]`
 *
 * @param {String} LINES The lines to highlight like `2-4`.
 *
 * @param {String} [,ONLY] Collapse non-highlighted lines greater than three
 * lines away (useful for long code snippets).
 *
 * @codestart javascript
 * /**
 *  * ```js
 *  * {
 *  *   "name": "bit-docs",
 *  *   "description": "Documentation generator",
 *  *   "author": "Bitovi",
 *  *   "license": "MIT",
 *  *   "date": "2017",
 *  *   "location": "Chicago",
 *  *   "season": "Summer",
 *  *   "awesome": "yes"
 *  * }
 *  * ```
 *  *
 *  * @highlight 2-4,only
 *  *|
 * @codeend
 *
 * Injects a `<span line-highlight="2-4,only"></span>` element to the page that
 * will be picked up and used by the static front-end script
 * [bit-docs-html-highlight-line/highlight-line.js].
 */
exports.highlight = {
    add: function(line, curData) {
        var space = line.substr(0, line.indexOf("@highlight"));
        var lines = line.replace("@highlight","").trim();
        var html = space+"<div line-highlight='"+lines+"'></div>";
        var validCurData =  (curData && curData.length !== 2);
        var useCurData = validCurData && (typeof curData.description === "string") && !curData.body;

        if(useCurData) {
            curData.description += "\n"+html+"\n";
        } else {
            this.body += html+"\n";
        }
    }
};
