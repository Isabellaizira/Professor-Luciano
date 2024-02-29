import { useState, useEffect } from 'react'
import apiLocal from './apiLocal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, StatusBar, Text, View, TextInput, TouchableOpacity } from 'react-native'
import firebase from './FireBaseConnect'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialROuteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Login({ navigation }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [respNome, setRespNome] = useState('')
  const [respToken, setRespToken] = useState('')

  async function handleLogin() {

    try {
      const resposta = await apiLocal.post('/LoginCliente', {
        email,
        password
      })
      navigation.navigate('Dashboard')
      await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
      await AsyncStorage.setItem('@token', JSON.stringify(resposta.data.token))

    } catch (error) {
      console.log(error)
      alert('Email/Senha Incorretos')
    }

  }

  async function handleAsyncNome() {
    const iNome = await AsyncStorage.getItem('@nome')
    const nome = JSON.parse(iNome)
    setRespToken('')
    setRespNome(nome)
  }

  async function handleAsyncToken() {
    const iToken = await AsyncStorage.getItem('@token')
    const token = JSON.parse(iToken)
    setRespNome('')
    setRespToken(token)
  }

  async function handleClearAsync() {
    await AsyncStorage.clear()
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <Text style={styles.titulo}>Login Cliente</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite Seu Email'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite Sua Senha'
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.buttonEnviar}>
        <Text style={styles.buttonEnviarText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAsyncNome} style={styles.buttonAsyncNome}>
        <Text style={styles.buttonEnviarText}>Async_Nome</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAsyncToken} style={styles.buttonAsyncToken}>
        <Text style={styles.buttonEnviarText}>Async_Token</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleClearAsync} style={styles.buttonAsyncClear}>
        <Text style={styles.buttonEnviarText}>Async_Clear</Text>
      </TouchableOpacity>

      <Text style={styles.textResposta}>{respNome}</Text>
      <Text>{respToken}</Text>

    </View>
  )
}

function Dashboard({ navigation }) {

  const [latitudeFb, setLatitudeFb] = useState('')
  const [longitudeFb, setLongitudeFb] = useState('')
  const [chave, setChave] = useState('')
  const [pedido, setPedido] = useState('')
  const [pedidoFb, setPedidoFb] = useState('')

  async function handlePedido() {
    try {

      let clientes = await firebase.database().ref('motoqueiros') //ref(NÓ), child(FILHO)
      clientes.child('pedidos').set({
        pedido: pedido,
      })

      console.log(pedido)

    } catch (error) {
      console.log(error)
      alert('Pedido Não Encontrado')
    }
  }

  useEffect(() => {
    async function acompanhamentoPedido() {
      await firebase.database().ref('motoqueiros').on('value', (snapshot) => {
        snapshot?.forEach((item) => {  //snapshot?=ele nao permite dar erro // forEach busca as informacoes e atribui em Item
          let data = {
            key: item.key,
            chave: item.chave,
            latitude: item.val().localizacao.latitude,
            longitude: item.val().localizacao.longitude,
            pedido: item.val().pedidos.pedido

          }
          setChave(data.key)
          setLatitudeFb(data.latitude)
          setLongitudeFb(data.longitude)
          // setPedidoFb(data.pedido)

          console.log(data.pedido)
        })
      })
    }
    acompanhamentoPedido()
  }, [])

   return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Dashboard</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonEnviar}>
        <Text style={styles.buttonEnviarText} >Retornar para Login</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Adicione o Numero do Seu Pedido'
        value={pedido}
        onChangeText={setPedido}
      />

      <TouchableOpacity style={styles.buttonEnviar}>
        <Text style={styles.buttonEnviarText} onPress={handlePedido}>Adicionar Pedido</Text>
      </TouchableOpacity>

      <Text>ID Motoqueiros:{chave}</Text>

      <Text style={styles.localFireBase} >Latitude:{latitudeFb}</Text>
      <Text style={styles.localFireBase} >Longitude:{longitudeFb}</Text>
      <Text style={styles.localFireBase} >Pedido:{pedidoFb}</Text>

      <TouchableOpacity style={styles.buttonAsyncToken}>
        <Text style={styles.buttonEnviarText}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAsyncNome}>
        <Text style={styles.buttonEnviarText}>Meus Pedidos</Text>
      </TouchableOpacity>


    </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    color: '#FFFFFF',
    marginTop: 20,
    fontSize: 20,
    backgroundColor: '#C2BCB8',
    height: 45,
    width: '95%',
    borderRadius: 5,
    textAlign: 'center'
  },
  buttonEnviar: {
    marginTop: 30,
    backgroundColor: '#E64F07',
    height: 45,
    width: '95%',
    borderRadius: 8,
  },
  buttonEnviarText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  buttonAsyncNome: {
    marginTop: 30,
    backgroundColor: "#FC553A",
    height: 45,
    width: '97%',
    borderRadius: 8,
  },
  buttonAsyncToken: {
    marginTop: 30,
    backgroundColor: "#FF0023",
    height: 45,
    width: '97%',
    borderRadius: 8,
  },
  buttonAsyncClear: {
    marginTop: 30,
    backgroundColor: "#DB9107",
    height: 45,
    width: '97%',
    borderRadius: 8,
  },
  textResposta: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },
  localFireBase: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  }
})
