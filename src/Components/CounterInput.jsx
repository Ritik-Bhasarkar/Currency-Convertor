/* eslint-disable react/prop-types */

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import {useState} from "react";



export default function CounterInput({heading,currency,setCurrency,amount,onAmountChange}) {

  const [isOpen,setIsOpen] = useState(false);
  
  const currencyList = [
    { currencyCode:'INR' , countryCode:'in' },
    { currencyCode:'USD' , countryCode:'us' },
    { currencyCode:'JPY' , countryCode:'jp' },
    { currencyCode:'SGD' , countryCode:'sg' },
    { currencyCode:'EUR' , countryCode:'eu' },
    { currencyCode:'GBP' , countryCode:'gb-eng' },
    { currencyCode:'AUD' , countryCode:'au' },
    { currencyCode:'CAD' , countryCode:'ca' },
    { currencyCode:'CHF' , countryCode:'ch' },
    { currencyCode:'CNH' , countryCode:'cn' },
    { currencyCode:'HKD' , countryCode:'hk' },
    { currencyCode:'NZD' , countryCode:'nz' },
    
  ]


  return (
    <div className="counterInput-container">
      <div className="counter-input-header">
        <span className="input-heading">{heading} </span>
      </div>
        
      <div className="counterInput-section">
          <div onClick={()=>setIsOpen((prev)=>!prev)} className="menu-container">
              <div className="flag-img default">
                <img src={`https://flagcdn.com/h40/us.png`} alt="flag"></img>
              </div>
              <span className="menu-heading">{currency}</span>
              {
                !isOpen ? (
                  <IoIosArrowDown className="arrow"/>
                ):(
                  <IoIosArrowUp className="arrow"/>
                )
              }
          </div>     

       <div className="dropdown-list">
          {isOpen && (
            <ul className="country-list"> 
              {currencyList.map((currency , index)=>(
              <li value={currency} key={index} onClick={()=>{setCurrency && setCurrency(currency.currencyCode); setIsOpen(false)} }>
                {/* <img className = 'country-flag' width='30px'
                src={`https://flagcdn.com/h40/${currency.countryCode}.png`}/> */}
                <div className="flag-img droplist">
                  <img src={`https://flagcdn.com/h40/${currency.countryCode}.png`} alt="flag"></img>
                </div>
                <span>{currency.currencyCode}</span>
              </li>
              ))}
            </ul>
          )}   
      </div> 

        <div className="input-section">
            <label htmlFor="number"></label>
            <input id="number" type="number" placeholder='amount' value={amount} onChange={onAmountChange}></input>   
             {/* input field leading with zero - end time error */}
        </div>
      </div>
        
    </div>
  )
}

