var types = require("./codepen-data");
var languageHTML = /language-(\w+)/;


function cleanCodePenData(data) {
    if(docObject.codepen) {
        docObject.codepen.forEach(function(replacement){
            if(data.js) {
                data.js = data.js.split(replacement[0]).join(replacement[1]);
            }
        });
    }
}

function createCodePen(data) {

    var JSONstring =
      JSON.stringify(data)
        // Quotes will screw up the JSON
        .replace(/"/g, "&​quot;") // careful copy and pasting, I had to use a zero-width space here to get markdown to post this.
        .replace(/'/g, "&apos;");


    var form =  '<form action="https://codepen.io/pen/define" method="POST" target="_blank">' +
        '<input type="hidden" name="data" value=\'' +
        JSONstring +
        '\'>' +
    '</form>';

    var div = document.createElement("div");
    div.innerHTML = form;
    document.body.appendChild(div);
    div.firstChild.submit();
    setTimeout(function(){
        document.body.removeChild(div);
    },10);
}


var browserMatches = document.body.matches || document.body.msMatchesSelector;
function matches(selector) {
    if(this.nodeType === 1) {
        if(selector.indexOf(",") >= 0 ) {
            return selector.split(",").some(function(selector){
                return browserMatches.call(this, selector);
            }, this);
        } else {
            return browserMatches.call(this, selector);
        }
    } else {
        return false;
    }
}


function findPre(start) {
    while(start) {
        if(start.nodeName === "PRE") {
            return start;
        }
        if(start.querySelector) {
            var pre = start.querySelector("pre");
            if(pre) {
                return pre;
            }
        }

        // needs to be previousSibling for zombie
        start = start.previousSibling;
    }
}

function findSelector(start, selector) {
    while(start) {
        if(matches.call(start, selector)) {
            return start;
        }
        if(start.querySelector) {
            var pre = start.querySelector(selector);
            if(pre) {
                return pre;
            }
        }

        // needs to be previousSibling for zombie
        start = start.previousSibling;
    }
}

function getStylesFromIframe(iframe) {
    var styles = iframe.contentDocument.documentElement.querySelectorAll("style");
    var cssText = "";
    styles.forEach(function(style){
        cssText += style.innerHTML;
    });
    return cssText;
}

module.exports = function() {

    document.body.addEventListener("click", function(ev){
        if(matches.call(ev.target, ".codepen")){

            var el = findSelector(ev.target, "pre, .demo_wrapper");
            if(el && matches.call(el, "pre")) {
                var preElement = el;
                var codeElement = preElement.querySelector("code");
                var language = codeElement.className.match(languageHTML)[1];
                var text = codeElement.textContent;

                var data = types[language](text);

                if(data.js) {
                    data.js = data.js.trim();
                }
                if(data.html) {
                    data.html = data.html.trim();
                }
                if(data) {
                    cleanCodePenData(data);
                    if(window.CREATE_CODE_PEN) {
                        CREATE_CODE_PEN(data);
                    } else {
                        createCodePen(data);
                    }

                } else {
                    console.warn("Unable to create a codepen for this demo");
                }
            }
            if(el && matches.call(el, ".demo_wrapper")) {
                var htmlCode = el.querySelector("[data-for=html] code");
                var htmlText = htmlCode ? htmlCode.textContent.trim() : "";

                var jsCode = el.querySelector("[data-for=js] code");
                var jsText = jsCode ? jsCode.textContent.trim() : "";

                var cssText = getStylesFromIframe( el.querySelector("iframe") );

                var codePen = {
                    html: htmlText,
                    js: jsText,
                    js_module: true,
                    editors: "1011",
                    css: cssText.trim()
                };
                cleanCodePenData(codePen);
                if(window.CREATE_CODE_PEN) {
                    CREATE_CODE_PEN(codePen);
                } else {
                    createCodePen(codePen);
                }

            }

        }
    });
};
