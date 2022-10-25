import axios from "axios"

export const searchPedido =  (cpf) => {
  return  axios.get(`http://localhost:3333/solicitations/${cpf}`)
    
}