import fs from 'fs'
import { Solicitation } from '../types/solicitations.type'

export function getSolicitationsInFile() {
    const solicitationsInFile = fs.readFileSync('solicitations.json').toString()
    const data: Array<Solicitation> = JSON.parse(solicitationsInFile)
    return data
}