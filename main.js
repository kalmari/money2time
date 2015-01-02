function identityFunction(value) {
    return value;
}

var rateInUsd = 20;

var currencies = {
    usd: {
        exchangeRateToUsd: 1,
        matches: /(US )?\$(\d*\.?\d+)/g,
        matchingGroupIndex: 2
    },
    eur: {
        exchangeRateToUsd: 1.21,
        matches: /EUR (\d*,?\d+)/g,
        normalizeValue: function(value) {
            return value.replace(/,/, '.')
        },
        matchingGroupIndex: 1
    }
};

var walk = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, null, false);
var node;
while (node = walk.nextNode()) {
    if (node.parentNode.nodeName != 'SCRIPT') {
        var replaced = false;
        for (var currencyKey in currencies) {
            var currency = currencies[currencyKey];
            node.data = node.data.replace(currency.matches, function() {
                replaced = true;
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
                var value = (currency.normalizeValue || identityFunction)(arguments[currency.matchingGroupIndex]);
                return (+value / currency.exchangeRateToUsd / rateInUsd).toFixed(2) + 'wh'
            });
            if (replaced) {
                break;
            }
        }
    }
}