import {v4 as uuidv4} from 'uuid'

export function findMany(request, response) {
    
    response.json([])
}

export function findOne(request, response) {
    const orderFiltered = orderList.find((order) => order.document_client === request.params.cpf)
    console.log(orderFiltered)
    response.json(orderFiltered)
}

export function create(request, response) {
    
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
}

export function destroy(request, response) {
    const newOrders = orderList.filter(order => order.id !== request.params.id)
    orderList = [...newOrders]
    response.json({mensagem: 'Pedido deletado com sucesso!'})
}