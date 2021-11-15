// API
// Exchange rate : http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
// Currency : https://restcountries.com/v3.1/currency/{currency-code}

const axios = require('axios');

const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');
    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    if(isNaN(exchangeRate)) {
        throw new Error(`Unable to get exchage rate from ${fromCurrency} to ${toCurrency}`)
    }

    return exchangeRate;
}

const getCountries = async (toCurrency) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${toCurrency}`);
    } catch(error) {
        throw new Error(`Unable to retrieve countries that use ${toCurrency}`)
    }
    return response.data.map(country => country.name.common)
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);

    const convertedAmount = (amount * exchangeRate).toFixed(2);
    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`
}

convertCurrency('USDD', 'EUR', 30)
    .then(message => {
        console.log(message)
    }).catch(error => {
        console.log(error.message)
    })
