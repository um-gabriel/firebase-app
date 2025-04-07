import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { auth } from "./services/firebaseConnection";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// A função para adicionar nome ao Firestore
const db = getFirestore();

export default function CreateUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Estado para o nome
    const router = useRouter();

    // Função para criar um novo usuário com nome
    async function createUser() {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                console.log("Cadastrado com sucesso! \n" + value.user.uid);

                // Salvar o nome do usuário no Firestore
                const userRef = doc(db, "users", value.user.uid); // Cria um documento na coleção "users"
                await setDoc(userRef, {
                    name: name,
                    email: email,
                    createdAt: new Date(),
                });

                if (value) {
                    router.replace('/(drawer)/(tabs)/home');
                }
            })
            .catch((error) => console.log(error.message)); // Melhor tratamento de erro
    }

    // Função para login do usuário existente
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                if (user) router.replace("/(drawer)/(tabs)/home");
            })
            .catch((err) => {
                alert(err?.message);
            });
    };

    // Função para logout
    async function logout() {
        signOut(auth)
            .then(() => {
                console.log("Saiu com sucesso!");
            })
            .catch((error) => console.log(error.message));
    }

    return (
        <View style={styles.container}>
            <Text>Olá Mundo - Aprendendo Firebase</Text>

            {/* Campo para o nome */}
            <TextInput
                placeholder="Nome"
                style={styles.input}
                value={name}
                onChangeText={value => setName(value)}
            />

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
                secureTextEntry={true} // Esconde a senha
            />
            <Button
                title="Cadastrar"
                onPress={createUser} // Modificado para chamar createUser
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
