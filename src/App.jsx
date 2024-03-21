// import { useState } from 'react'
import './App.css'
import CounterInput from './Components/CounterInput'
import axiosApi from './APIs/Axios';
import { useContext, useEffect} from "react";
import { CurrencyContext } from './Context/CurrencyContext';
import { LuArrowDownUp } from "react-icons/lu";


function App() {

  const baseHeading = 'Amount';
  const convertedHeading = 'Converted Amount'


 //context calling

  const {
        setLoading,
        baseCurrency, 
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


  // whether the amountChane is done in base input or in convertion input

  let baseAmount , exchangeAmount;
  
  if(amountChange){
    baseAmount = amount;
    exchangeAmount = amount * exchangeRate;
  }else{
    exchangeAmount = amount;
    baseAmount = amount / exchangeRate;
  }

  //Rounding amounts upto 2 decimal points

  const roundOffbaseAmount = Math.round(baseAmount * 100)/100;
  const roundOffExchangeAmount = Math.round(exchangeAmount * 100)/100
 
  
  useEffect(()=>{
    const apikey = import.meta.env.VITE_API_KEY
    const fetchData = async()=>{
      setLoading(true);
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
        console.log(error.response)
      }
      setLoading(false);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[baseCurrency,currencies,amount])


  const handleBaseAmountChange=(e)=>{    
    setAmount(e.target.value);
    setAmountChange(true);
  }
 

  const handleExchangeAmountChange=(e)=>{
    setAmount(e.target.value)
    setAmountChange(false);
  }

  const handleSwap=()=>{
    setBaseCurrency(currencies);
    setCurrencies(baseCurrency)
  }

  return (
    <div className='app'>
      <div className="counter-container">
        <div className='container-header'>
         <h1>Currency Counter</h1>
         <span> Check live rates, set rate alerts, receive notifications and more</span>
        </div>
        
        <div className="counter-section">
            <CounterInput 
            heading={baseHeading} 
            currency={baseCurrency} 
            setCurrency={setBaseCurrency} 
            amount={roundOffbaseAmount} 
            onAmountChange = {handleBaseAmountChange}/>

            <span className='swap-arrows' onClick={handleSwap}>
              <LuArrowDownUp className='arrow' />
            </span>

            <CounterInput 
            heading = {convertedHeading} 
            currency={currencies} 
            setCurrency= {setCurrencies} 
            amount={roundOffExchangeAmount} 
            onAmountChange = {handleExchangeAmountChange}/>
      </div>

      <div className='footer'>
        <span>Indicative exchange Rate</span>
        <p>1 {baseCurrency} = {exchangeRate} {currencies}</p>
      </div>
    </div>
    </div>
  )
}

export default App
