import fs from 'fs'

export function getSolicitationsInFile() {
    const solicitationsInFile = fs.readFileSync('solicitations.json').toString()
    return  JSON.parse(solicitationsInFile)
}