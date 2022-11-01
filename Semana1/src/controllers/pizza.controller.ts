import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import { getPizzasInFile } from '../utils/getPizzasInFile'
import { Request, Response } from 'express'
import { BodyParamsCreatePizza, Pizza, QueryParamsFindMyPizzas } from '../types/pizzas.types'

export function findMany(request: Request<{}, {}, {}, QueryParamsFindMyPizzas>, response: Response) {
    const nameQuery = request.query.name || ""    
   const pizzas: Pizza[] = getPizzasInFile()
    const searchedPizzas = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase())) 
    response.json(searchedPizzas)
}

export function create(request: Request<{}, {}, BodyParamsCreatePizza >, response: Response) {
    const {name, description, price, ingredients} = request.body

    const pizzas: Pizza[] = getPizzasInFile()

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