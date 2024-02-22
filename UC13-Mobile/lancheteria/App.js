import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Rotas from './src/routes/routes'

export default function App() {
  return (
    //navigationContainer= q engloba toda a aplicação
    <NavigationContainer>
      <StatusBar backgroundColor='#000000' barStyle='light-content' translucent={false} />
      <Rotas />
    </NavigationContainer>
  )
}
