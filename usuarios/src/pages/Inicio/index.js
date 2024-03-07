import { Link } from 'react-router-dom'
//import './pedido.css'

export default function Inicio(){
    return(
        <div className='nEncontrada'>
            <h1>Bem vindo</h1>
            
            <Link to='/' >Voltar para o Início</Link>
        </div>
    )
}