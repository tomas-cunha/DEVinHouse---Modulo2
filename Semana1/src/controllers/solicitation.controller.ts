import {v4 as uuidv4} from 'uuid'
import { getSolicitationsInFile } from '../utils/getSolicitationsInFile'
import fs from 'fs'
import { Request, Response } from 'express'
import { RouteParamsDelete, RouteParamsFindOne, Solicitation } from '../types/solicitations.type'

export function findMany(request: Request, response: Response) {
    const solicitations = getSolicitationsInFile()
     response.json(solicitations)
}

export function findOne(request: Request<RouteParamsFindOne>, response: Response) {
    const solicitations = getSolicitationsInFile()
    const solicitation = solicitations.find((solicitation) => solicitation.document_client === request.params.cpf)
    console.log(solicitation)
    response.json(solicitation)
}

export function create(request: Request<{}, {}, Solicitation>, response: Response) {
    
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
    fs.writeFileSync('solicitations.json', JSON.stringify([...solicitations, order]))   
    return response.status(201).json(order)
}

export function destroy(request: Request<RouteParamsDelete>, response: Response) {
    const solicitations = getSolicitationsInFile()
    const newOrders = solicitations.filter(solicitation => solicitation.id !== request.params.id)
    fs.writeFileSync('solicitations.json', JSON.stringify([...newOrders]))
    response.json({mensagem: 'Pedido deletado com sucesso!'})
}

export function updateStatus (request: Request<RouteParamsFindOne>, response: Response) {

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