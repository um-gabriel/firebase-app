import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Modal } from "react-native";
import { router } from 'expo-router';

export default function Quinta() {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá Tela Cinco</Text>
      <Button
        title="Navegar"
        onPress={() => {router.replace('/(tabs)/homepage/primeira')}}
      />
      <Button 
        title="Abrir Modal"
        onPress={() => setAbrirModal(true)}
      />
      
      <Modal
        visible={abrirModal}
        onRequestClose={() => setAbrirModal(false)} 
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Text>Este é um Modal!</Text>
          <Button title="Fechar" onPress={() => setAbrirModal(false)} />
        </View>
        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "80%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
