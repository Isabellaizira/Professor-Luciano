import { Link } from 'react-router-dom'
//import './cliente.css'

export default function Erro(){
    return(
        <div className='nEncontrada'>
            <h1>404</h1>
            <h2>Página Não Encontrada</h2>
            <Link to='/Inicio' >Voltar para o Início</Link>
        </div>
    )
}