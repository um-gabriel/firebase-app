import React, {useState} from 'react'
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';

export default function Segunda() {

    const handlePress = (id: string) => {
        Alert.alert('ID do item', `O ID do item é: ${id}`);
    }

    const data = [
        { id: '1', nome: 'João' },
        { id: '2', nome: 'Maria' },
        { id: '3', nome: 'Pedro' },
        { id: '4', nome: 'Ana' },
        { id: '5', nome: 'Carlos' },
        { id: '6', nome: 'Patricia' },
        { id: '7', nome: 'Luciana' },
        { id: '8', nome: 'Rodrigo' },
        { id: '9', nome: 'Fernanda' },
        { id: '10', nome: 'Gustavo' },
    ];
// CRIANDO UMA FLATLIST PROVISÓRIA (SEM USAR O REACT NATIVE)
    return (
        <View style={styles.container}>
          <FlatList
            data={data} // Dados a serem exibidos
            keyExtractor={(item) => item.id} // Definir chave única
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.item} 
                onPress={() => handlePress(item.id)} // Ao clicar, chama a função com o ID
              >
                <Text style={styles.text}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'blue',
        padding: 10,
      },
      item: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: 'red',
        borderRadius: 8,
        width: '100%',
      },
      text: {
        fontSize: 18,
        color: '#333',
      },
});

// DEPOIS TENTAR LINKAR OS DADOS COM UM SERVIDOR EXTERNO