import { ItemContainer, ItemWrapper } from "./PizzaItem.styled"

export const PizzaItem = ({name, price, ingredients}) => {
    return (
        <ItemContainer>
            <ItemWrapper>
                <strong>{name}</strong>
                <p>R$ {price}</p>                
            </ItemWrapper>
            <p>-- {ingredients}</p>
        </ItemContainer>
    )
}