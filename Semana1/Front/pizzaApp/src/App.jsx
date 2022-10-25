
import { Header, Pizzas } from './components'
import { Pedidos } from './components/Pedidos'

function App() {

  return (
    <div className="App">
      <Header/>
      <main style={{backgroundColor: "#E5E1EE", display: "flex", justifyContent: "space-evenly", padding:"2% 5% 0 5%", height:"80vh" }}>
        <Pizzas/>
        <div style={{ border: "0.5px solid black", transform: "rotate(180deg)", height:"80%"}}></div>
        <Pedidos/>
      </main>      
    </div>
  )
}

export default App
