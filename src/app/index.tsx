import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useRouter } from 'expo-router';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { auth } from "./services/firebaseConnection";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // INICIO LOGAR USUÁIO EXISTENTE 
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            if (user) router.replace("/(drawer)/(tabs)/home");
          })
          .catch((err) => {
            alert(err?.message);
          });
      };
    // FIM LOGAR USUÁIO EXISTENTE 
    
    // INICIO CRIAR UM NOVO NO BANCO DE DADOS
    async function createUser() {
        createUserWithEmailAndPassword(auth, email, password)
            .then(value => {
                console.log("Cadastrado com sucesso! \n" + value.user.uid);
                if (value) router.replace('/(drawer)/(tabs)/home');
            })
            .catch((error) => console.log(error.message)); // Corrigido aqui: melhor tratamento de erro
    };
// INICIO - FUNÇÃO DE LOGIN ANTIGA, EM TESTES
    async function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then(value => {
                console.log("Login realizado com sucesso! Seja bem vindo \n" + value.user.uid + " - " + email);
            })
            .catch((error) => console.log(error.message)); // Corrigido aqui: melhor tratamento de erro
    };
// FIM - FUNÇÃO DE LOGIN ANTIGA, EM TESTES

    async function logout() {
        signOut(auth)
            .then(value => {
                console.log("Saiu com sucesso!");
            })
            .catch((error) => console.log(error.message)); // Corrigido aqui: melhor tratamento de erro
    }

    return (
        <View style={styles.container}>
            <Text>Olá Mundo - Aprendendo Firebase</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={value => setEmail(value)}
            />
            <TextInput
                placeholder="Senha"
                style={styles.input}
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true} // Correção aqui: para esconder a senha
            />
            <Button
                title="Cadastrar"
                onPress={() => router.replace('/createUser')}
            />
            <Button
                title="Entrar"
                onPress={handleLogin}
            />
            <Button
                title="Sair"
                onPress={logout}
            />

            <Button
                title="Navegar"
                onPress={() => {router.replace('/(drawer)/(tabs)/home')}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',   
        alignItems: 'center',
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "70%"
    },
});
