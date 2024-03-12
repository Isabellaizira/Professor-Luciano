import { useState } from 'react'
import Modal from 'react-modal'
import './App.css'

function App() {

  const [ nome, setNome ] = useState('')

  //  const [ nome, setNome ] = useState(['']) com chaves dentro do parenteses, é quando o que vamos chamar se for um array de objetos



  const [ modalAberto, setModalAberto ] = useState(false)

   async function abrirModal(){
   //sempre que a função for ter conexão com o banco de dados ela será assincrona
    setModalAberto(true)
   }

   function fecharModal(){
    //se for uma função que ficará apenas no componente não há necessidade de ser assincrona
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






















