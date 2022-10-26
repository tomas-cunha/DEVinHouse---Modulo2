import fs from 'fs'

export function getPizzasInFile() {
    const pizzasInFile = fs.readFileSync('pizzaList.json').toString()
   return JSON.parse(pizzasInFile)
}