
exports.codepen = {
    add: function(line, curData, scope, docMap, defaultWriteProp, options) {
        // get the space before the line.  This is so descriptions will work right.
        var space = line.substr(0, line.indexOf("@codepen"));
        var html = space+"<div class='codepen'></div>";
        var validCurData =  (curData && curData.length !== 2);
        var useCurData = validCurData && (typeof curData.description === "string") && !curData.body;

        // copies codepen options on to the docObject so they are accessible by the script
        if(options.siteConfig.codepen) {
            this.codepen = options.siteConfig.codepen;
        }

        if(useCurData) {
            curData.description += "\n"+html+"\n";
        } else {
            this.body += html+"\n";
        }
    }
};
