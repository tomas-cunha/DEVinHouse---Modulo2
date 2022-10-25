const express = require('express')
const app = express()
const {v4 : uuidv4} = require('uuid')
const pizzaList = require('./pizzaList.json')
let orderList = require('./orderList.json')
const cors = require('cors')

app.use(express.json())
app.use(cors())


app.listen(3333, () => {
    console.log('Servidor online')
})

app.get('/pizzas', (request, response) => {
    const nameQuery = request.query.name || ""
    
    const searchedPizzas = pizzaList.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase())) 
    response.json(searchedPizzas)
    
})


app.post('/pizzas', (request, response) => {
    const {name, description, price, ingredients} = request.body

    const pizzaExists = pizzaList.find(pizza => pizza.name === name)

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
    pizzaList.push(pizza)
    response.status(201).json(pizza)
    console.log('Pizza cadastrada com sucesso!')
})

app.get('/solicitations', (request, response) => {
    response.json(orderList)
})

app.post('/solicitations', (request, response) => {
    const {
        name_client, 
        document_client,
        contact_client,
        address_client,
        payment_method,
        observations,
        pizzas
        
      } = request.body

      const order = {
        id: uuidv4(),
        name_client, 
        document_client,
        contact_client,
        address_client,
        payment_method,
        observations,
        pizzas,
        status: "Em Produção"
      }

    orderList.push(order)
    return response.status(201).json(order)

})

app.get('/solicitations/:cpf', (request, response) => {
    const orderFiltered = orderList.find((order) => order.document_client === request.params.cpf)
    console.log(orderFiltered)
    response.json(orderFiltered)
})

app.delete('/solicitations/:id', (request, response) => {
    const newOrders = orderList.filter(order => order.id !== request.params.id)
    orderList = [...newOrders]
    response.json({mensagem: 'Pedido deletado com sucesso!'})
})
