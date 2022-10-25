import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cadastrarPedido } from "../../services/cadastrarPedido";
import { deletarPedido } from "../../services/deletarPedido";
import { getPedidos } from "../../services/getPedidos";
import { searchPedido } from "../../services/searchPedido";
import { PedidoItem } from "../PedidoItem";
import { FormPedidos, PedidosTitle, SearchWrapper } from "./Pedidos.styled"
import { InputWrapper,  SectionPedidos } from "./Pedidos.styled"

export const Pedidos = () => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm()
    const [pedidos, setPedidos] = useState([]);
    const [cpfCliente, setCpfCliente] = useState('')
   
    async function fetchPedidos() {
        try {
          const response = await getPedidos();
          console.log(response.data)
          setPedidos(response.data);
        } catch (e) {
          console.log(e);
        }
      }
   

    useEffect(() => {
       
        fetchPedidos();
      }, []); 

     

    return (
        <SectionPedidos>  
            <PedidosTitle>Pedidos</PedidosTitle>
            <FormPedidos onSubmit={handleSubmit((data) => {
                cadastrarPedido(data).then(res => setPedidos([...pedidos, res.data]))
              
                })}>
                <InputWrapper>
                    <label htmlFor="name_client">Nome</label>
                    <input type="text" {...register("name_client")} />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="document_client">CPF</label>
                    <input type="text" {...register("document_client")}/>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="contact_client">Telefone</label>
                    <input type="text" {...register("contact_client")} />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="address_client">Endereço</label>
                    <input type="text" {...register("address_client")}/>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="payment_method">Forma de pagamento</label>
                    <input type="text" {...register("payment_method")}/>
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="observations">Observações</label>
                    <input type="text" {...register("observations")} />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor="pizzas">Pizzas</label>
                    <input type="text"  {...register("pizzas")}/>
                </InputWrapper>
                <button type="submit">Pedir</button>
            </FormPedidos>
            <SearchWrapper>
                <input 
                placeholder="Digite seu CPF..." 
                onChange={(e) => setCpfCliente(e.target.value)}/>
                {console.log(cpfCliente)}
                <button type="submit" onClick={() => searchPedido(cpfCliente).then(res => setPedidos([res.data]))} >Pesquisar</button>
                <button type="reset" onClick={() => getPedidos().then(res => setPedidos(res.data))}>Limpar</button>
            </SearchWrapper>

            <ul>
            {pedidos && (
                pedidos.map(pedido => {
                    return <PedidoItem key={pedido.id} 
                    name={pedido.name_client}
                     cpf={pedido.document_client} 
                     pizza={pedido.pizzas} 
                     onClick={() => deletarPedido(pedido.id, setPedidos, pedidos)
                    }
                     />
                })
            )}
            </ul>
        </SectionPedidos>
    )
}