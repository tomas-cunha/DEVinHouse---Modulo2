import axios from "axios"

export const getPizzas = (data) => {
  return  axios.get('http://localhost:3333/pizzas')
    
}