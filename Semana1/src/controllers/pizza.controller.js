import {v4 as uuidv4} from 'uuid'
import fs from 'fs'

export function findMany(request, response) {
    const nameQuery = request.query.name || ""    
    const pizzasInFile = fs.readFileSync('pizzaList.json').toString()
    const pizzas = JSON.parse(pizzasInFile)
    const searchedPizzas = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase())) 
    response.json(searchedPizzas)
}

export function create(request, response) {
    const {name, description, price, ingredients} = request.body

    const pizzasInFile = fs.readFileSync('pizzaList.json').toString()
    const pizzas = JSON.parse(pizzasInFile)

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