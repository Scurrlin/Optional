const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cryptoSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User'},

import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "JPY") setSymbol("¥");
    else if (currency === "GBP") setSymbol("£");
    else if (currency === "AUD") setSymbol("A$");
    else if (currency === "CAD") setSymbol("C$");
    else if (currency === "CHF") setSymbol("₣");
    else if (currency === "CNY") setSymbol("CN¥");
    else if (currency === "HKD") setSymbol("HK$");
    else if (currency === "NZD") setSymbol("NZ$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

const mongoose = require('mongoose');

const chartDays = new mongoose.Schema(

    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
);

module.exports = mongoose.model('chartDays', chartDaysSchema);

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

module.exports = mongoose.model('Crypto', cryptoSchema);