import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, StatusBar, View, TextInput, TouchableOpacity } from 'react-native'
import apiCEP from './services/apiCEP'

export default function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [buscaCEP, setBuscaCEP] = useState('')

  function handleLogin() {
    if (!email || !password) {
      alert('Campos em Branco Não São Permitidos')
    }

    // alert(`${email}`)
    // alert(`${password}`)
    console.log(email, password)
    setCep('')
  }

  async function handleCep() {
    if (cep.length < 8 || cep.length > 8) {
      alert('CEP Incorreto')
    } else {
      const result = await apiCEP.get(`/${cep}/json/`)
      setBuscaCEP(result.data)
    }

  }

  useEffect(() => {
    function pesquisaCEP() {
      setRua(buscaCEP.logradouro || rua)
      setBairro(buscaCEP.bairro || bairro)
      setCidade(buscaCEP.localidade || cidade)
      setEstado(buscaCEP.uf || estado)
    }
    pesquisaCEP()
  }, [handleCep])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.texto1}> Formulário - UC13!{'\n'}</Text>

      <View>
        <Text style={styles.texto}>Email:</Text>
        <TextInput style={styles.input}
          placeholder='Digite Seu Email'
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.texto}>Senha:</Text>
        <TextInput style={styles.input}
          placeholder='Digite Sua Senha'
          secureTextEntry={true} //para esconder a Password
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.texto}>CEP:</Text>
        <TextInput style={styles.input}
          placeholder='Digite Seu CEP'
          value={cep}
          onChangeText={setCep}
          onBlur={handleCep}
        />

        <Text style={styles.texto}>Rua:</Text>
        <TextInput style={styles.input}
          placeholder='Digite Seu Rua'
          value={rua}
          onChangeText={setRua}
        // disabled
        />

        <Text style={styles.texto}>Bairro:</Text>
        <TextInput style={styles.input}
          placeholder='Digite Seu Bairro'
          value={bairro}
          onChangeText={setBairro}
        // disabled
        />

        <Text style={styles.texto}>Cidade:</Text>
        <TextInput style={styles.input}
          placeholder='Digite Seu Cidade'
          value={cidade}
          onChangeText={setCidade}
        // disabled
        />

        <Text style={styles.texto}>Estado:</Text>
        <TextInput style={styles.input}
          placeholder='Digite Seu Estado'
          value={estado}
          onChangeText={setEstado}
        // disabled
        />

      </View>

      <TouchableOpacity onPress={handleLogin} >
        <Text style={styles.botao}>Enviar</Text>
      </TouchableOpacity>


    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 35,
    width: 250,
    margin: 5,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: '#33AEFF',
  },

  texto: {
    textAlign: 'justify',
    fontStyle: 'normal',
    fontSize: 16,
  },

  texto1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'justify',
    textAlignVertical: 'center',
    fontStyle: 'italic',
  },

  botao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    height: 35,
    padding: 6,
    backgroundColor: '#33AEFF'
  }

})
