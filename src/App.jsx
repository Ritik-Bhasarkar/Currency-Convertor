// import { useState } from 'react'
import './App.css'
import CounterInput from './Components/CounterInput'
import axiosApi from './APIs/Axios';
import { useContext, useEffect} from "react";
import { CurrencyContext } from './Context/CurrencyContext';


function App() {

  const baseHeading = 'Amount';
  const convertedHeading = 'Converted Amount'

  const {baseCurrency, 
        setBaseCurrency, 
        currencies,
        setCurrencies,
        amount , 
        setAmount,
        exchangeRate , 
        setExchangeRate, 
        amountChange,
        setAmountChange
        } = useContext(CurrencyContext)


  let baseAmount , exchangeAmount;
  
  if(amountChange){
    baseAmount = amount;
    exchangeAmount = amount * exchangeRate;
  }else{
    exchangeAmount = amount;
    baseAmount = amount / exchangeRate;
  }

  console.log(exchangeAmount)
  
  useEffect(()=>{
    const apikey = import.meta.env.VITE_API_KEY
    const fetchData = async()=>{
      try{
        const response = await axiosApi.get(`?apikey=${apikey}`,{
          params:{
            base_currency: baseCurrency,
            currencies: currencies
          }
        });

        const data = response.data;
        setExchangeRate(data.data[currencies]);
      }catch(error){
        console.log(error)
      }
    };
    fetchData();
  },[baseCurrency,currencies,amount,setExchangeRate])


  const handleBaseAmountChange=(e)=>{
    setAmount(e.target.value);
    setAmountChange(true);
  }
  console.log(amountChange)

  const handleExchangeAmountChange=(e)=>{
    setAmount(e.target.value)
    setAmountChange(false);
  }

  const handleSwap=(e)=>{
    setBaseCurrency(currencies);
    setCurrencies(baseCurrency)
  }

  return (
    <div className='app'>
      <div className="counter-heading">
        <h1>Currency Counter</h1>
        <span> Check live rates, set rate alerts, receive notifications and more</span>
        </div>
        <div className="counter-section">
            <CounterInput heading={baseHeading} currency={baseCurrency} setCurrency={setBaseCurrency} amount={baseAmount} onAmountChange = {handleBaseAmountChange}/>
            <span className='' onClick={handleSwap}>=</span>
            <CounterInput heading = {convertedHeading} currency={currencies} setCurrency= {setCurrencies} amount={exchangeAmount} onAmountChange = {handleExchangeAmountChange}/>
        </div>
    </div>
  )
}

export default App
