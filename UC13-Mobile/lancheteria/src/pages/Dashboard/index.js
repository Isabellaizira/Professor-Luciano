import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Dashboard() {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textoTitulo}>Tela de Dashboard</Text>

                <TouchableOpacity style={styles.buttonDashboard} onPress={() => navigation.navigate('Inicio')}>
                    <Text style={styles.textButtonDashboard} >Inicio</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },

    textoTitulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#385580',
    },


    buttonDashboard: {
        marginTop: 10,
        backgroundColor: '#21577F',
        height: 40,
        borderRadius: 8,
    },

    textButtonDashboard: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }


})
