import { useEffect, useRef, useState } from 'react'
import apiLocal from './apiLocal'
import firebase from './FireBaseConnect'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  DrawerLayoutAndroidBase
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync
} from 'expo-location'
import MapView from 'react-native-maps'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='Gps' component={Gps} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Login({ navigation }) {

  const [nome, setNome] = useState('')
  const [nusuario, setNusuario] = useState('')
  const [password, setPassword] = useState('')
  // const [respNome, setRespNome] = useState('')
  // const [respToken, setRespToken] = useState('')

  async function handleLogin() {

    try {
      const resposta = await apiLocal.post('/LoginMotoqueiros', {
        nome,
        nusuario,
        password
      })
      navigation.navigate('Dashboard')
      await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id))
      await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
      await AsyncStorage.setItem('@token', JSON.stringify(resposta.data.token))
      const positionAtual = await getCurrentPositionAsync();

      let usuarios = await firebase.database().ref('motoqueiros').child(resposta.data.id) //ref(NÓ), child(FILHO)
      let chave = usuarios.push().key
      usuarios.child(chave).set({
        usuario: nusuario,
        nome,
        latitude: positionAtual.coords.latitude,
        longitude: positionAtual.coords.longitude
      })

    } catch (error) {
      console.log(error)
      alert('Usuário/Senha Incorretos')
    }
  }

  // async function handleAsyncNome() {
  //   const iNome = await AsyncStorage.getItem('@nome')
  //   const nome = JSON.parse(iNome)
  //   setRespToken('')
  //   setRespNome(nome)
  // }

  // async function handleAsyncToken() {
  //   const iToken = await AsyncStorage.getItem('@token')
  //   const token = JSON.parse(iToken)
  //   setRespNome('')
  //   setRespToken(token)
  // }

  // async function handleClearAsync() {
  //   await AsyncStorage.clear()
  // }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Login Motoqueiro</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite Seu Nome'
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite Seu Usuário'
        value={nusuario}
        onChangeText={setNusuario}
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

      {/* <TouchableOpacity onPress={handleAsyncNome} style={styles.buttonAsyncNome}>
        <Text style={styles.buttonEnviarText}>Async_Nome</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAsyncToken} style={styles.buttonAsyncToken}>
        <Text style={styles.buttonEnviarText}>Async_Token</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClearAsync} style={styles.buttonAsyncClear}>
        <Text style={styles.buttonEnviarText}>Async_Clear</Text>
      </TouchableOpacity>
      <Text style={styles.textResposta}>{respNome}</Text>
      <Text>{respToken}</Text> */}

    </View>
  )
}

function Dashboard({ navigation }) {

  const [moto, setMoto] = useState('')
  const [dados, setDados] = useState([''])
  // const [pedido, setPedido] = useState('')
  // const [terPedido, setTerPedido] = useState(false)

  // useEffect(() => {
  //   async function addPedido() {
  //     try {
  //       const resposta = { pedido }
  //       setDados(resposta.data)

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   addPedido()
  // }, [dados])

  // async function handleAddPedido() {
  //   setDados(pedido)
  // }
  useEffect(() => {
    async function ListarMoto() {
      const resposta = await apiLocal.get('/ListarMotoqueirosToken', {
        headers: {
          Authorization: 'Bearer ' + `${token}`
        }
      })
      setMoto(resposta.data)
    }
    ListarMoto()
  }, [dados])
  return (
    <View style={styles.container}>
      <Text style={styles.titulo} >Dashboard</Text>

      {/* <Text style={styles.titulo}  >Motoqueiro: </Text> */}

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonEnviar}>
        <Text style={styles.buttonEnviarText}>Retornar para Login</Text>
      </TouchableOpacity>
      {/* 
      <TextInput
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite o Numero do Pedido'
        value={pedido}
        onChangeText={setPedido}
      />
      <TouchableOpacity onPress={handleAddPedido} style={styles.buttonEnviar}>
        <Text style={styles.buttonEnviarText}>Adicionar Pedido</Text>
        {dados.map((item) => {
          return (
            <Text>Pedido:{item.pedido}</Text>
          )
        })}
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => navigation.navigate('Gps')} style={styles.buttonAsyncToken}>
        <Text style={styles.buttonEnviarText}>Iniciar Rotas</Text>
      </TouchableOpacity>

    </View >
  )
}

function Gps() {

  const [localizacao, setLocalizacao] = useState(null)
  // console.log(localizacao.coords.latitude)
  const mapaRef = useRef(MapView)

  useEffect(() => {
    async function requisitarLocal() {
      const { granted } = await requestForegroundPermissionsAsync()
      if (granted) {
        const positionAtual = await getCurrentPositionAsync()
        setLocalizacao(positionAtual)
      }
    }
    requisitarLocal()
  }, [])

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (resposta) => {
      setLocalizacao(resposta)
      mapaRef.current.animateCamera({
        pitch: 70,
        center: resposta.coords
      })
    })

  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#D9900F' />
      {
        localizacao &&
        <MapView
          ref={mapaRef}
          style={styles.mapaview}
          loadingEnabled={true}
          initialRegion={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
          }}>
          <Image
            style={styles.iconMarker}
            source={require('./assets/capacete.png')}
          />
        </MapView>


      }
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
    backgroundColor: "#FF0027",
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
  mapaview: {
    height: '100%',
    width: '100%'
  },
  iconMarker: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  }
})
