import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../pages/Dashboard'
import Inicio from '../pages/Inicio'

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen                           //stack.screen = tela inicial 
                name='Inicio'
                component={Inicio}
                options={{ headerShown: false }}   //hearderShown: false= tira o header fixo de cima
            />
            
            <Stack.Screen                           //stack.screen = tela secundaria 
                name='Dashboard'
                component={Dashboard}
                options={{ headerShown: false }}   //hearderShown: false= tira o header fixo de cima
            />

        </Stack.Navigator>
    )
}