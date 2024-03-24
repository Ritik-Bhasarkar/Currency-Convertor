// import { useState } from 'react'
import './App.css'
import CounterInput from './Components/CounterInput'
import axiosApi from './APIs/Axios';
import { useContext, useEffect} from "react";
import { CurrencyContext } from './Context/CurrencyContext';
import { CgArrowsExchangeAltV } from "react-icons/cg";



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
    exchangeAmount = amount * exchangeRate;     // 83.5864865558566
  }else{
    exchangeAmount = amount;
    baseAmount = amount / exchangeRate;
  }

  //Rounding amounts upto 2 decimal points

  const roundOffbaseAmount = Math.round(baseAmount * 100)/100;
  const roundOffExchangeAmount = Math.round(exchangeAmount * 100)/100;   //83.58

  // console.log(roundOffExchangeAmount);
  // console.log(roundOffbaseAmount)
 
  
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
         <h1>Currency Convertor</h1>
         <span> Check live rates, set rate alerts, receive <br></br> notifications and more</span>
        </div>
        
        <div className="counter-section">
            <CounterInput 
            heading={baseHeading} 
            currency={baseCurrency} 
            setCurrency={setBaseCurrency} 
            amount={roundOffbaseAmount} 
            onAmountChange = {handleBaseAmountChange}/>

            <span className='swap-arrows' onClick={handleSwap}>
              <CgArrowsExchangeAltV className='arrow' />
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
        <p>1 {baseCurrency} = {Math.round(exchangeRate *100)/100} {currencies}</p>
      </div>
    </div>
    </div>
  )
}

export default App
