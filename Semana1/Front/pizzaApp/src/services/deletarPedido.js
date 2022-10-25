import axios from "axios"
import { getPedidos } from "./getPedidos"

export const deletarPedido = (id, func, array) => {
    axios.delete(`http://localhost:3333/solicitations/${id}`)
    func( array.filter(a => a.id !== id))
}