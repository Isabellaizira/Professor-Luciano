import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar, StyleSheet, View, Text } from 'react-native'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync, LocationAccuracy } from 'expo-location'

export default function App() {

  const [localizacao, setLocalizacao] = useState(null)  //hook = onde esta armazenado as coordenadas
  const [loading, setLoading] = useState(false)

  const mapaRef = useRef(MapView)  //criar referencias

  async function requisitarLocal() {
    const { granted } = await requestForegroundPermissionsAsync()
    if (granted) {
      const positionAtual = await getCurrentPositionAsync()
      setLocalizacao(positionAtual)
      setLoading(true)
    }
  }
  

  useEffect(() => {
    requisitarLocal()
  }, [localizacao])

  useEffect(() => {
    if (loading === true) {
      watchPositionAsync({
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1
      }, (resposta) => {
        setLocalizacao(resposta)
        mapaRef.current.animateCamera({
          center: resposta.coords
        })
        setLoading(true)
      })
    }
  }, [])

  if (loading === false) {
    return (
      <View style={styles.container}>
        <Text>Aguarde Carregando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor='#D9900F' barStyle='light-content' translucent={false} />
      {/* o MAPVIEW mostra o mapa */}
      {
        localizacao &&
        <MapView
          ref={mapaRef}
          style={styles.mapView}
          loadingEnabled={true}     // para deixar um pontinho azul na sua localização
          initialRegion={{         // onde coloca a regiao, ou seja, latitude e longitude
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.006,         //latitudeDelta é oq amplia a localizacao
            longitudeDelta: 0.006        //longitudeDelta é oq amplia a localizacao
          }}
        >

          <Marker
            coordinate={{
              latitude: localizacao.coords.latitude,
              longitude: localizacao.coords.longitude,
            }}
            title='Sua Localização'
          />
        </MapView>

      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mapView: {
    height: '100%',
    width: '100%',
  },
})
