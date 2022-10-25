import { ItemContainer  } from "../PizzaItem/PizzaItem.styled"
import { PedidoWrapper } from "./PedidoItem.styled"

export const PedidoItem = ({name, cpf, pizza, onClick}) => {
    return (
        <ItemContainer>
            <PedidoWrapper>
                <strong>{name}</strong>
                <p> - {cpf}</p>  
                <button onClick={onClick}>Deletar</button>              
            </PedidoWrapper>
            <p>-- {pizza}</p>
        </ItemContainer>
    )
}