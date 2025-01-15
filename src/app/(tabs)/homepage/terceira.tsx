import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../../services/firebaseConnection.js';  // Importando a instância do Firestore
import { collection, getDocs } from 'firebase/firestore';  // Funções para buscar dados

// Defina o tipo dos itens para que o TypeScript saiba o que esperar.
type Item = {
  id: string;
  nome: string;
  empresa: string;
  salario: number;
};

export default function Terceira() {
// Inicio da Função que Retorna Itens na FlatList
// Agora você define explicitamente o tipo dos itens como 'Item[]'
  const [itens, setItens] = useState<Item[]>([]); // Estado para armazenar os itens da coleção
  const [loading, setLoading] = useState(true); // Estado para controle de loading

  useEffect(() => {
    // Função assíncrona para carregar os itens do Firestore
    const fetchItens = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vagas')); // Substitua 'itens' pelo nome da sua coleção
        const fetchedItens = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as { nome: string, empresa: string, salario: number } // Aqui estamos informando que os documentos têm o campo 'nome'
        }));
        setItens(fetchedItens); // Agora, o TypeScript entende que você está passando um array de 'Item'
      } catch (error) {
        console.error('Erro ao buscar os itens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItens(); // Chama a função ao montar o componente
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando...</Text>
      </View>
    );
  }
// Fim da Função que Retorna Itens na FlatList

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>
      <FlatList
        data={itens}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Nome: {item.nome}</Text> {/* Nome da vaga */}
            <Text style={styles.itemText}>Empresa: {item.empresa}</Text> {/* Nome da empresa */}
            <Text style={styles.itemText}>Salário: R${item.salario}</Text> {/* Salário formatado */}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
});
