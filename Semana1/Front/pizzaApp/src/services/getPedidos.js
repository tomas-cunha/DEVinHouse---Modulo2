import axios from "axios"

export const getPedidos =  (data) => {
  return  axios.get('http://localhost:3333/solicitations')
    
}