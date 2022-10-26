import {v4 as uuidv4} from 'uuid'
import { getSolicitationsInFile } from '../utils/getSolicitationsInFile.js'
import fs from 'fs'

export function findMany(request, response) {
    const solicitations = getSolicitationsInFile()
     response.json(solicitations)
}

export function findOne(request, response) {
    const solicitations = getSolicitationsInFile()
    const solicitation = solicitations.find((solicitation) => solicitation.document_client === request.params.cpf)
    console.log(solicitation)
    response.json(solicitation)
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

    const solicitations = getSolicitationsInFile()
    fs.writeFileSync('solicitations.json', JSON.stringify([...solicitations, solicitation]))   
    return response.status(201).json(order)
}

export function destroy(request, response) {
    const newOrders = orderList.filter(order => order.id !== request.params.id)
    orderList = [...newOrders]
    response.json({mensagem: 'Pedido deletado com sucesso!'})
}

export function updateStatus (request, response) {

    const solicitations = getSolicitationsInFile()

    const updatedSolicitations = solicitations.map((solicitation) => {
        if(solicitation.document_client === request.params.cpf) {
            solicitation.status = "A caminho"
        }
        return solicitation
    })
    fs.writeFileSync('solicitations.json', JSON.stringify(updatedSolicitations))
    return response.json()
}