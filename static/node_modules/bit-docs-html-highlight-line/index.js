require("bit-docs-prettify");

require("prismjs/plugins/line-highlight/prism-line-highlight");
require("prismjs/plugins/line-highlight/prism-line-highlight.css");

require("./prism-collapse");
require("./prism-collapse.less");

/**
 * Get node for provided line number
 * Copied from prism-line-numbers.js and modified to support nested spans
 * Original version assumed all line number spans were inside .line-numbers-rows
 * but now they may be may be nested inside collapsed sections
 *
 * @param {Element} element pre element
 * @param {Number} number line number
 * @return {Element|undefined}
 */
Prism.plugins.lineNumbers.getLine = function (element, number) {
	if (element.tagName !== 'PRE' || !element.classList.contains('line-numbers')) {
		return;
	}

	var lineNumberRows = element.querySelector('.line-numbers-rows');
	var lineNumbers = lineNumberRows.querySelectorAll('span'); // added
	var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
	var lineNumberEnd = lineNumberStart + (lineNumbers.length - 1);

	if (number < lineNumberStart) {
		number = lineNumberStart;
	}
	if (number > lineNumberEnd) {
		number = lineNumberEnd;
	}

	var lineIndex = number - lineNumberStart;

	return lineNumbers[lineIndex];
};

var padding = 3;
var getConfig = function(lineString, lineCount) {
	var lines = lineString
		.split(',')
		.map(function(data) {
			return data.trim();
		})
		.filter(function(data) {
			return data;
		})
	;

	var collapse = [];
	var index = lines.indexOf('only');
	if (index > -1) {
		lines.splice(index, 1);

		var current = 1;
		for (var i = 0; i < lines.length; i++) {
			var range = lines[i]
				.split('-')
				.map(function(val) {
					return parseInt(val);
				})
				.filter(function(val) {
					return typeof val === 'number' && !isNaN(val);
				})
			;

			if (range[0] > current + padding) {
				collapse.push(current + '-' + (range[0] - 1 - padding));
			}

			current = (range[1] || range[0]) + padding + 1;
		}

		if (current < lineCount) {
			collapse.push(current + '-' + lineCount);
		}
	}

	return {
		lines: lines.length ? lines.join(',') : false,
		collapse: collapse.length ? collapse.join(',') : false,
	};
};

function findPreviousSibling(start, tag) {
	tag = tag.toUpperCase();

	while(start) {
        if(start.nodeName === tag) {
            return start;
        }
        if(start.querySelector) {
            var pre = start.querySelector(tag);
            if(pre) {
                return pre;
            }
        }

        // needs to be previousSibling for zombie
        start = start.previousSibling;
    }
}

module.exports = function() {
	var highlights = document.querySelectorAll('div[line-highlight]');

	for (var i = 0; i < highlights.length; i++) {
		var highlight = highlights[i];

		var preBlock = findPreviousSibling(highlight, 'pre');
		var codeBlock = preBlock.childNodes.item(0);

		var total = codeBlock.innerHTML.split('\n').length - 1;
		var config = getConfig(highlight.getAttribute('line-highlight'), total);

		if (preBlock) {
			preBlock.setAttribute('data-line', config.lines);

			if (config.collapse) {
				preBlock.setAttribute('data-collapse', config.collapse);
			}
		}
	};
};
