import { useState } from 'react'
import Modal from 'react-modal'
import './App.css'

function App() {

  const [ nome, setNome ] = useState('')

  const [ modalAberto, setModalAberto ] = useState(false)

   function abrirModal(){
    setModalAberto(true)
   }

   function fecharModal(){
   setModalAberto(false)
   }
   
   function receberNome(){
    alert(nome)
   }

  return (
    <div>
      <header className='containerApp'>
        Trabalhando com Modal
      </header>
      <button onClick={abrirModal}>Abrir Modal</button>
      <Modal 
      className="Modal"
      overlayClassName="Overlay"
      isOpen={modalAberto}>
        <h1>Modal Está Aberto</h1>
        <form onSubmit={receberNome}>
          <label>Nome:</label>
          <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          />
        </form>
        <button onClick={fecharModal}>Fechar Modal</button>
      </Modal>
    </div>
  );
}

export default App;
