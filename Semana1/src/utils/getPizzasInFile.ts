import fs from 'fs'
import { Pizza } from '../types/pizzas.types'

export function getPizzasInFile() {
    const pizzasInFile = fs.readFileSync('pizzaList.json').toString()
   const data: Pizza[] = JSON.parse(pizzasInFile)
   return data
}