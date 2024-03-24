/* eslint-disable react/prop-types */

import {createContext, useState, useEffect } from "react";


export const CurrencyContext = createContext()

const CurrencyProvider = ({ children }) => {

  const [loading,setLoading] =  useState(false);
  const [baseCurrency ,setBaseCurrency] = useState( localStorage.getItem('baseCurrency') ||'USD');  
  const [currencies,setCurrencies] = useState(localStorage.getItem('currencies') ||'INR');
  const [amount,setAmount] = useState(1);
  const [amountChange , setAmountChange] = useState(true);  //look after where amount is changes in base or not i.e true
  const [exchangeRate,setExchangeRate] = useState()



  //set currency in local storage 

  const setStorageBaseCurrency =(value)=>{
    localStorage.setItem('baseCurrency',value);
    setBaseCurrency(value);
  }

  const setStorageExchangeCurrency =(value)=>{
    localStorage.setItem('currencies',value);
    setCurrencies(value);
  }
  
  useEffect(()=>{
    const localBasedCurrency = localStorage.getItem("baseCurrency");
    const localExchangeCurrency = localStorage.getItem("currencies");

    if(localBasedCurrency){
       setBaseCurrency(localBasedCurrency)
    }

    if(localExchangeCurrency){
      setCurrencies(localExchangeCurrency)
    }

  },[setBaseCurrency,setCurrencies])

  const obj = {
    loading,
    setLoading,
    baseCurrency,
    setBaseCurrency:setStorageBaseCurrency,
    currencies,
    setCurrencies:setStorageExchangeCurrency,
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
