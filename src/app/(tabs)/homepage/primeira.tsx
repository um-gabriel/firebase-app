import { Button, StyleSheet, Text, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'expo-router';  // Importando useRouter para navegação

export default function Primeira() {
  const { currentUser } = getAuth();
  const router = useRouter();  // Instância do hook de navegação

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());  // Deslogar do Firebase
      router.replace('/');  // Navegar de volta para a tela principal (Index)
    } catch (error) {
      console.error('Erro ao deslogar:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentUser?.email}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});


// CÓDIGO ANTIGO ABAIXO. APAGAR APÓS FAZE DE TESTE

// import React, { useEffect, useState } from 'react';
// import { Text, View, StyleSheet, Button } from 'react-native';
// import { useRouter } from 'expo-router'; // Correção: usar o hook useRouter
// import { getAuth } from 'firebase/auth';
// import { auth } from '../../services/firebaseConnection.js';  // Certifique-se de que a exportação de auth está correta

// export default function Primeira() {
//     const [userEmail, setUserEmail] = useState<string>('');  // Estado para armazenar o email do usuário
//     const router = useRouter(); 

//     // Função para obter o usuário logado
//     useEffect(() => {
//         const user = getAuth().currentUser;  // Pega o usuário autenticado
//         if (user) {
//             setUserEmail(user.email || 'Usuário não autenticado');
//         }
//     }, []);

//     return(
//         <View style={styles.container}>
//             <Text>Tela 1</Text>
//             <Text>Bem-vindo, {userEmail}!</Text> {/* Exibe o email do usuário */}

//             <Button
//                 title='Voltar'
//                 onPress={() => { 
//                     router.replace('/'); // Navega para o index (página principal)
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',   
//         alignItems: 'center',
//     },
// });
