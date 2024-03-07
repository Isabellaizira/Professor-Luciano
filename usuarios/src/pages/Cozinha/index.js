import { Link } from 'react-router-dom'
//import './cozinha.css'

export default function Cozinha(){
    return(
        <div>
            <h1>Cozinha</h1>
            <h2>Pedidos:</h2>
            <Link to='/Inicio' >Voltar para o Início</Link>
        </div>
    )
}