function callIfFunction(value){
  if(typeof value === "function") {
    try {
      value();
    } catch(e) {}
  }
  return value;
}
module.exports = {
	"bit-docs-prettify": callIfFunction( require("bit-docs-prettify") ),
	"bit-docs-tag-demo": callIfFunction( require("bit-docs-tag-demo") ),
	"bit-docs-html-codepen-link": callIfFunction( require("bit-docs-html-codepen-link") ),
	"bit-docs-html-highlight-line": callIfFunction( require("bit-docs-html-highlight-line") )};