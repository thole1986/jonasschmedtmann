// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
// `https://api.frankfurter.dev/v1/latest?base=${fromCur}&symbols=${toCur}`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${fromCur}&symbols=${toCur}`,
        );
        const data = await res.json();
        const convertedAmount = (amount * data.rates[toCur]).toFixed(2);
        setConverted(convertedAmount);
        setIsLoading(false);
      }
      if (fromCur === toCur) return setConverted(amount);

      // Call external API to convert.
      convert();
    },
    [amount, fromCur, toCur],
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />

      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted} {toCur}
      </p>
    </div>
  );
}
