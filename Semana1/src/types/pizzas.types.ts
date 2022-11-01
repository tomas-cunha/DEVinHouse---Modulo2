export interface QueryParamsFindMyPizzas {
    name?: string

}

export interface Pizza {
    id: string,
    name:string,
    description: string,
    price: number,
    ingredients: Array<string>
}

export interface BodyParamsCreatePizza {
    name:string,
    description: string,
    price: number,
    ingredients: Array<string>
}