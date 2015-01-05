var hour = 60 * 60 * 1000;

function now() {
    return new Date().getTime();
}

function makeAjaxRequest(request, callback) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            callback(JSON.parse(xmlHttpRequest.responseText));
        }
    };
    xmlHttpRequest.open('GET', request, true);
    xmlHttpRequest.send();
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message == 'getData') {
        var completedAjaxRequestsCount = 0,
            exchangeRatesToUsd,
            rate,
            currency;

        var checkThatAllAjaxRequestsCompleted = function() {
            completedAjaxRequestsCount++;
            if (completedAjaxRequestsCount == 2) {
                sendResponse({
                    exchangeRatesToUsd: exchangeRatesToUsd,
                    rate: rate,
                    currency: currency
                });
            }
        };

        chrome.storage.local.get('exchangeRatesToUsd', function(items) {
            exchangeRatesToUsd = items.exchangeRatesToUsd;
            if (!exchangeRatesToUsd || (now() - exchangeRatesToUsd.DateTime * 1000) > hour) {
                makeAjaxRequest('http://www.getexchangerates.com/api/latest.json', function(response) {
                    exchangeRatesToUsd = response[0];
                    chrome.storage.local.set({
                        exchangeRatesToUsd: exchangeRatesToUsd
                    }, function() {
                        checkThatAllAjaxRequestsCompleted()
                    });
                })
            } else {
                checkThatAllAjaxRequestsCompleted()
            }
        });

        chrome.storage.sync.get(['rate', 'currency'], function(items) {
            rate = items.rate;
            currency = items.currency;
            checkThatAllAjaxRequestsCompleted();
        });

        return true;
    }
});

if (!localStorage.getItem('installTime')) {
    localStorage.setItem('installTime', now());
    chrome.tabs.create({url: 'options.html'});
}