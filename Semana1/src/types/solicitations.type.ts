export interface Solicitation {
    id: string
    name_client: string, 
        document_client: string,
        contact_client: number,
        address_client: string,
        payment_method: string,
        observations: string,
        pizzas: string
        status: string
}

export interface RouteParamsFindOne {
    cpf: string
}

export interface RouteParamsDelete {
    id: string
}