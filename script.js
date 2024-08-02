const apiKey = 'afa34047f10771fefbfcfbb6';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

const currencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK',
    'NZD', 'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'RUB', 'BRL', 'ZAR',
    'DKK', 'PLN', 'THB', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED'
];

window.onload = function() {
    let fromCurrency = document.getElementById('fromCurrency');
    let toCurrency = document.getElementById('toCurrency');
    
    currencies.forEach(currency => {
        let option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;
        fromCurrency.appendChild(option1);
        
        let option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;
        toCurrency.appendChild(option2);
    });
};

async function convert() {
    let amount = document.getElementById('amount').value;
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;
    let loading = document.getElementById('loading');
    let amountError = document.getElementById('amount-error');

    if (amount === "" || isNaN(amount)) {
        amountError.innerText = "Please enter a valid amount";
        return;
    } else {
        amountError.innerText = "";
    }

    loading.style.display = 'block';
    document.getElementById('result').innerText = "";

    try {
        const response = await fetch(`${apiUrl}${fromCurrency}`);
        const data = await response.json();

        if (data.result === 'error') {
            document.getElementById('result').innerText = "Error fetching conversion rates";
            return;
        }

        const conversionRate = data.conversion_rates[toCurrency];
        const result = amount * conversionRate;

        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        document.getElementById('result').innerText = "Error fetching conversion rates";
    } finally {
        loading.style.display = 'none';
    }
}

function reverseCurrencies() {
    let fromCurrency = document.getElementById('fromCurrency');
    let toCurrency = document.getElementById('toCurrency');

    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
