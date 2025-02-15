import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter, router } from 'expo-router';  // Correção aqui: useRouter é necessário

export default function Account() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Olá Tela Account</Text>
          <Button
            title="Navegar"
            onPress={() => {router.replace('/(drawer)/drawer')}}
          />
        </View>
      );
};

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
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });