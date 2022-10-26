import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import { getPizzasInFile } from '../utils/getPizzasInFile.js'

export function findMany(request, response) {
    const nameQuery = request.query.name || ""    
   const pizzas = getPizzasInFile()
    const searchedPizzas = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase())) 
    response.json(searchedPizzas)
}

export function create(request, response) {
    const {name, description, price, ingredients} = request.body

    const pizzas = getPizzasInFile()

    const pizzaExists = pizzas.find(pizza => pizza.name === name)

    if (pizzaExists) {
        return response.status(401).json({error: "Pizza já cadastrada"})
    }

    const pizza = {
        id: uuidv4() ,
        name,
        description,
        price,
        ingredients
    }
    fs.writeFileSync('pizzaList.json', JSON.stringify([...pizzas, pizza]))
    response.status(201).json(pizza)
    console.log('Pizza cadastrada com sucesso!')
   
}