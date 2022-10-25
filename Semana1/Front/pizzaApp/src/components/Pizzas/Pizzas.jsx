import { ContainerWrapper, FormPizzas, InputWrapper, PizzaTitle, SectionPizza } from "./Pizzas.styled"
import {useForm} from "react-hook-form"
import { cadastrarPizza } from "../../services"
import { getPizzas } from "../../services/getPizzas"
import { useEffect, useState } from "react"
import { PizzaItem } from "../PizzaItem"

export const Pizzas = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        async function fetchPizzas() {
          try {
            const response = await getPizzas();
            console.log(response.data)
            setPizzas(response.data);
          } catch (e) {
            console.log(e);
          }
        }
        fetchPizzas();
      },[]);
    return (
        <SectionPizza>  
            <PizzaTitle>Pizzas</PizzaTitle>
            <FormPizzas onSubmit={handleSubmit((data) => {
                cadastrarPizza(data).then(res => setPizzas([...pizzas, res.data]))
              
                })}>
                <ContainerWrapper>
                <InputWrapper>
                    <label htmlFor="name">Nome</label>
                    <input type="text"  {...register("name")}/>
                </InputWrapper>                
                <InputWrapper>
                    <label htmlFor="price">Preço</label>
                    <input type="number" {...register("price")} />
                </InputWrapper>
                </ContainerWrapper>
                <ContainerWrapper>
                <InputWrapper>
                    <label htmlFor="description">Descrição</label>
                    <textarea name="" id="" cols="23" rows="10" {...register("description")}></textarea>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="ingredients">Ingredientes</label>
                    <textarea name="" id="" cols="22" rows="10" {...register("ingredients")}></textarea>
                </InputWrapper>
                </ContainerWrapper>               
                <button type="submit" style={{alignSelf: "center", padding: "5%"}}>Cadastrar</button>
            </FormPizzas>
            <ul>
            {pizzas && (
                pizzas.map(pizza => {
                    return <PizzaItem key={pizza.id} name={pizza.name} price={pizza.price} ingredients={pizza.ingredients}/>
                })
            )}
            </ul>
        </SectionPizza>
    )
}