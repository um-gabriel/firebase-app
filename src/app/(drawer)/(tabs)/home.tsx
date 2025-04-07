import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { db } from '@/app/services/firebaseConnection.js';  // Importando a instância do Firestore
import { collection, getDocs } from 'firebase/firestore';  // Funções para buscar dados
import MyModal from '../../components/modal'; // Importando o Modal

// Defina o tipo dos itens para que o TypeScript saiba o que esperar.
type Item = {
  id: string;
  nome: string;
  empresa: string;
  salario: number;
  descricaoVaga: string;
};

export default function Terceira() {
// Inicio da Função que Retorna Itens na FlatList
// Agora você define explicitamente o tipo dos itens como 'Item[]'
  const [itens, setItens] = useState<Item[]>([]); // Estado para armazenar os itens da coleção
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do Modal
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // Estado para armazenar o item selecionado

  const openModal = (item: Item) => {
    setSelectedItem(item); // Define o item selecionado
    setModalVisible(true); // Abre o modal
  };

  const closeModal = () => {
    setModalVisible(false); // Fecha o modal
    setSelectedItem(null); // Limpa o item selecionado
  };  

  useEffect(() => {
    // Função assíncrona para carregar os itens do Firestore
    const fetchItens = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vagas')); // Substitua 'itens' pelo nome da sua coleção
        const fetchedItens = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as { nome: string, empresa: string, salario: number, descricaoVaga: string } // Aqui estamos informando que os documentos têm o campo 'nome'
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

    {/* FlatList exibindo os itens */}
    <FlatList
      data={itens}
      showsVerticalScrollIndicator={false} //Esconde a barra de rolagem
      renderItem={({ item }) => (
        <Pressable onPress={() => openModal(item)} style={styles.item}>
          <Text style={styles.itemText}>Nome: {item.nome}</Text>
          <Text style={styles.itemText}>Empresa: {item.empresa}</Text>
          <Text style={styles.itemText}>Salário: R${item.salario}</Text>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContent}
    />

    <MyModal 
      visible={modalVisible} 
      onClose={closeModal} 
      selectedItem={selectedItem} 
    />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    borderWidth: 0.5,
    width: '100%',
    backgroundColor: 'white',

    borderRadius: 4,
    marginBottom: 5,
  },
  flatListContent: {
    marginRight: 5,
    marginLeft: 5,
  },
  itemText: {
    fontSize: 18,
  },
});
