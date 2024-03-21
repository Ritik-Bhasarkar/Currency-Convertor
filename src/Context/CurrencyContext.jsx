import {createContext, useState } from "react";


export const CurrencyContext = createContext()

const CurrencyProvider = ({ children }) => {


  const [baseCurrency ,setBaseCurrency] = useState('USD');
  const [currencies,setCurrencies] = useState('INR');
  const [amount,setAmount] = useState(1);
  const [amountChange , setAmountChange] = useState(true);
  const [exchangeRate,setExchangeRate] = useState()


  const obj = {
    baseCurrency,
    setBaseCurrency,
    currencies,
    setCurrencies,
    amount,
    setAmount,
    amountChange,
    setAmountChange,
    exchangeRate,
    setExchangeRate,
  }
  
  return <CurrencyContext.Provider value={obj}>
          {children}
          </CurrencyContext.Provider>
}

export default CurrencyProvider;
