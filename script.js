const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertButton = document.getElementById("convert");
const swapButton = document.getElementById("swap");

async function convertCurrency() {
  const amount = Number(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  if (from === to) {
    result.textContent = `${amount.toFixed(2)} ${from} = ${amount.toFixed(2)} ${to}`;
    return;
  }

  result.textContent = "Converting...";

  try {
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${from}`
    );

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();
    const rate = data.rates[to];
    const converted = amount * rate;

    result.textContent =
      `${amount.toFixed(2)} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    result.textContent = "Unable to fetch exchange rate. Try again.";
  }
}

swapButton.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
});

convertButton.addEventListener("click", convertCurrency);

amountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    convertCurrency();
  }
});

convertCurrency();
