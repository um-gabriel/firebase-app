import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useRouter, Router } from 'expo-router';  // Correção aqui: useRouter é necessário
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./services/firebaseConnection";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();  // Correção aqui: useRouter precisa ser chamado

    async function createUser() {
        createUserWithEmailAndPassword(auth, email, password)
            .then(value => {
                console.log("Cadastrado com sucesso! \n" + value.user.uid);
                if (value) router.replace('/(tabs)/homepage');
            })
            .catch((error) => console.log(error.message)); // Corrigido aqui: melhor tratamento de erro
    };

    async function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then(value => {
                console.log("Login realizado com sucesso! Seja bem vindo \n" + value.user.uid + " - " + email);
            })
            .catch((error) => console.log(error.message)); // Corrigido aqui: melhor tratamento de erro
    };

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
                onPress={createUser}
            />
            <Button
                title="Entrar"
                onPress={login}
            />
            <Button
                title="Sair"
                onPress={logout}
            />

            <Button
                title="Navegar"
                onPress={() => {router.replace('/(tabs)/homepage')}}
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
