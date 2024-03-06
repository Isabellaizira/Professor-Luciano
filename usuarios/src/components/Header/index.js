import './style.header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <header>
                <Link className='logo' to='/Inicio'>Lancheteria</Link>


                <div class="dropdown">

                    

                    <div class="dropdown-content">

                  < Link to='/Categoria'><button><b>Categoria</b></button> </Link>    <br />   

                        < Link to='/Cliente'><button><b>Cliente</b></button></Link><br />

                        < Link to='/Cozinha'><button><b>Cozinha</b></button> </Link><br />

                        <Link to='/Pedido'><button><b>Pedido</b></button> </Link><br />

                    </div>

                </div>


            </header>
        </div>
    )
}