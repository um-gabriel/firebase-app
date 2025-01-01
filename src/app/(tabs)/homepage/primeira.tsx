import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router'; // Correção: usar o hook useRouter

export default function Primeira() {
    const router = useRouter(); // Correção: use o hook aqui para obter a instância do router

    return(
        <View style={styles.container}>
            <Text>Tela 1</Text>

            <Button
                title='Voltar'
                onPress={() => { 
                    router.replace('/'); // Navega para o index (página principal)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',   
        alignItems: 'center',
    },
});
