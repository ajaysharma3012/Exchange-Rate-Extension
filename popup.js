document.addEventListener("DOMContentLoaded", function () {
    const convertButton = document.getElementById("convertButton");
    const resultElement = document.getElementById("result");

    convertButton.addEventListener("click", function () {
        const fromCurrency = document.getElementById("fromCurrency").value;
        const toCurrency = document.getElementById("toCurrency").value;
        const amount = parseFloat(document.getElementById("amount").value);

        fetch("https://api.exchangerate-api.com/v4/latest/" + fromCurrency)
            .then((response) => response.json())
            .then((data) => {
                const exchangeRate = data.rates[toCurrency];
                if (exchangeRate) {
                    const convertedAmount = (amount * exchangeRate).toFixed(2);
                    resultElement.textContent = `${amount} ${fromCurrency} is ${convertedAmount} ${toCurrency}`;
                } else {
                    resultElement.textContent = "Invalid currency selection.";
                }
            })
            .catch((error) => {
                console.error("Error fetching exchange rates: ", error);
                resultElement.textContent = "An error occurred. Please try again later.";
            });
    });
});
