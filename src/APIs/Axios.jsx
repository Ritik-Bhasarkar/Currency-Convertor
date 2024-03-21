import axios from "axios";


const axiosApi = axios.create({
    baseURL:'https://api.freecurrencyapi.com/v1/latest',
        params:{
           'apiKey':import.meta.env.VITE_API_KEY,
          
        }
    
})

export default axiosApi