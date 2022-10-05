const express = require('express')
const app = express()
const {v4 : uuidv4} = require('uuid')
const pizzaList = require('./pizzaList.json')

app.use(express.json())


app.listen(3333, () => {
    console.log('Servidor online')
})

app.get('/pizzas', (request, response) => {
    response.json(pizzaList)
})

app.post('/pizzas', (request, response) => {
    const pizza = {
        id: uuidv4() ,
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        ingredients: request.body.ingredients
    }
    pizzaList.push(pizza)
    response.status(201).json(pizza)
    console.log('Pizza cadastrada com sucesso!')
})