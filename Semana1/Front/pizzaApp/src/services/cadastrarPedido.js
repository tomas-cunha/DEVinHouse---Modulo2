import axios from "axios"

export const cadastrarPedido = (data, func) => {
 return   axios.post('http://localhost:3333/solicitations', {
    name_client: data.name_client,
    document_client: data.document_client,
    contact_client: data.contact_client,
    address_client: data.address_client,
    payment_method: data.payment_method,
    observations: data.observations,
    pizzas: data.pizzas
    })
}