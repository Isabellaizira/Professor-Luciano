import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Inicio() {
    const navigation = useNavigation()

    function handleInicio() {
        navigation.navigate('Dashboard')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textoTitulo}> Tela Inicial</Text>

                <TouchableOpacity style={styles.buttonInicio} onPress={handleInicio}>
                    {/* <TouchableOpacity style={styles.buttonInicio} onPress={() => navigation.navigate('Dashboard')}> */}
                    <Text style={styles.textButtonInicio} >Dashboard</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },

    textoTitulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#385580',
    },

    buttonInicio: {
        marginTop: 10,
        backgroundColor: '#21577F',
        height: 40,
        borderRadius: 8,
    },

    textButtonInicio: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }

})