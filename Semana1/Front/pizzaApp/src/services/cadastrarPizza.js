import axios from "axios"

export const cadastrarPizza = (data) => {
 return   axios.post('http://localhost:3333/pizzas', {
    name: data.name,
    description: data.description,
    price: data.price,
    ingredients: data.ingredients
    })
    
}