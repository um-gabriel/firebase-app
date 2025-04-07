import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from '../services/firebaseConnection';  // Importando corretamente

const db = getFirestore();  // Instância do Firestore

export default function Primeira() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);  // Estado de carregamento
  const [error, setError] = useState<string | null>(null);  // Estado de erro
  const router = useRouter();

  // Função para obter o nome do usuário do Firestore
  const getUserName = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);  
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserName(docSnap.data().name);  // Atualiza o estado com o nome
      } else {
        console.log("Usuário não encontrado no Firestore");
      }
    } catch (error) {
      console.error("Erro ao recuperar o nome:", error.message);
      setError('Erro ao recuperar o nome.');
    } finally {
      setLoading(false);  // Fim do carregamento
    }
  };

  // Função para atualizar o estado do usuário logado
  useEffect(() => {
    const user = getAuth().currentUser;  // Pega o usuário autenticado
    if (user) {
      setUserEmail(user.email || 'Usuário não autenticado');
      getUserName(user.uid);  // Recupera o nome do usuário no Firestore
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);  
      router.replace('/');  
    } catch (error) {
      console.error('Erro ao deslogar:', error.message);
    }
  };

  const handleUpdateData = () => {
    // Lógica para atualizar dados do usuário pode ser implementada aqui
    console.log("Atualizando dados...");
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Indicador de carregamento
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text> // Exibe erro, se ocorrer
      ) : (
        <>
          <Text style={styles.title}>
            {userName ? `Bem-vindo, ${userName}!` : `Bem-vindo, ${userEmail}`}
          </Text>
          <Text style={styles.title}>{userEmail}</Text>
          <Button title="Sair da Conta" onPress={handleSignOut} />
          <Button title="Atualizar Dados" onPress={handleUpdateData} />
        </>
      )}
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
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
