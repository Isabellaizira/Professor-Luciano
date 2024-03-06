import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Cozinha from './pages/Cozinha'
import Categoria from './pages/Categoria'
import Cliente from './pages/Cliente'
import Pedido from './pages/Pedido'
import Inicio from './pages/Inicio'

export default function RoutesApp(){
    return (
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path = '/Cozinha' element = {<Cozinha/>}/>
            <Route path = '/Categoria' element = {<Categoria/>}/>
            <Route path = '/Cliente' element = {<Cliente/>} />
            <Route path = '/Pedido' element = {<Pedido/>} />
            <Route path = '/Inicio' element = {<Inicio/>} />
        </Routes>
        </BrowserRouter>
    )
}