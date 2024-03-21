
export default function CounterInput({heading,currency,setCurrency,amount,onAmountChange}) {

  

  const currencyList = [
    { currencyCode:'INR' , countryCode:'in' },
    { currencyCode:'USD' , countryCode:'usa' },
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
        <span>{heading}</span>


        < div className="counterInput-section">
        <select value={currency} onChange={(e)=>setCurrency && setCurrency(e.target.value)}>
          {currencyList.map((currency , index)=>(
            <option key={index} >
              <span>
               {currency.currencyCode}
              </span>
            </option>
          ))}
        </select>



        <div className="input-section">
            <label htmlFor="number"></label>
            <input id="number" type="number" placeholder='amount' value={amount} onChange={onAmountChange}></input>
        </div>
        </div>
        
    </div>
  )
}



{/* <img src={`https://flagcdn.com/h40/${currency.code}.png`}/>  */}