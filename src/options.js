function saveOptions() {
    var rate = document.getElementById('rate').value;
    var currency = document.getElementById('currency').value;
    chrome.storage.sync.set({
        rate: +rate,
        currency: currency
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
    });
}

function initOptions() {
    chrome.runtime.sendMessage('getData', function(response) {
        document.getElementById('rate').value = response.rate;
        var currencyElement = document.getElementById('currency');
        currencyElement.value = response.currency;

        for (var currency in response.exchangeRatesToUsd) {
            if (currency != 'DateTime') {
                currencyElement.add(new Option(currency, currency));
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initOptions);
document.getElementById('save').addEventListener('click', saveOptions);