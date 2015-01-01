var dollarsPerHourRate = 20;
var dollarRegexp = /\$(\d*\.?\d+)/g;
var walk = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, null, false);
var node;
while (node = walk.nextNode()) {
    if (node.parentNode.nodeName != 'SCRIPT') {
        node.data = node.data.replace(dollarRegexp, function(match, p1) {
            return (+p1 / dollarsPerHourRate).toFixed(2) + 'wh'
        });
    }
}