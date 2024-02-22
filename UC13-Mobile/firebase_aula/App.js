import firebase from './FireBaseConnect'
import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

console.disableYellowBox = false

export default function App() {

  //identificaco do vendedor
  // const vendedor = 13
  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [vendedores, setVendedores] = useState([''])  //([''])= é um array vazio

  async function CadastroFB() {
    if (!nome || !cidade) {
      alert('Campos Vazios!')
    }
    let usuarios = await firebase.database().ref('vendedores') //ref(NÓ), child(FILHO) .child(vendedor)
    let chave = usuarios.push().key //gera chave unica

    usuarios.child(chave).set({
      nome: nome,
      cidade: cidade
    })

    //sai o teclado ao clicar em enviar
    Keyboard.dismiss()
  }

  useEffect(() => {
    async function dados() {
      //manipular as informações para gravar no banco 
      //criando um nó
      await firebase.database().ref('usuarios').set('nome')
    }
    dados()
  }, [])

  useEffect(() => {
    async function buscarVendedores() {
      await firebase.database().ref('vendedores').on('value', (snapshot) => { //snapshot recebe a informacao(pode ser outra)
        setVendedores([''])
        snapshot?.forEach((item) => {  //snapshot?=ele nao permite dar erro // forEach busca as informacoes e atribui em Item
          let data = {
            key: item.key,
            nome: item.val().nome,
            cidade: item.val().cidade,
          }
          setVendedores(oldArray => [...oldArray, data]) //para nao sobressair as informaçoes novas
        })
      })
    }
    buscarVendedores()
  }, [])

  async function handleDelete(key) {
    alert(key)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000000' barStyle={'default'} translucent={false} />
      <Text style={styles.titulo}>Utilizando o Firebase!</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor='#000000'
        placeholder='Digite Seu Nome'
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor='#000000'
        placeholder='Digite Seu Cidade'
        value={cidade}
        onChangeText={setCidade}
      />

      <TouchableOpacity style={styles.enviar} onPress={CadastroFB}>
        <Text style={styles.textEnviar}>Enviar</Text>
      </TouchableOpacity>

      {vendedores.map((item) => {
        return (
          <View>
            {item.length !== 0 && ( //se for diferente de 0 rederiza dentro de Text
            //<> = serve para encapsular um JSX
              <> 
                <Text>Nome:{item.nome}</Text>
                <Text>Cidade:{item.cidade}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.key)}>
                  <Feather name="trash-2" size={30} color="#900" />
                </TouchableOpacity>
              </>
            )}
          </View>
        )
      })}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  input: {
    color: '#000000',
    marginTop: 10,
    fontSize: 20,
    backgroundColor: '#CEE5F3',
    height: 40,
    width: '85%',
    borderRadius: 5,
    textAlign: 'center'
  },

  enviar: {
    marginTop: 10,
    backgroundColor: '#B8CBD9',
    height: 40,
    width: '85%',
    borderRadius: 5,
  },

  textEnviar: {
    textAlign: 'center',
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },

})