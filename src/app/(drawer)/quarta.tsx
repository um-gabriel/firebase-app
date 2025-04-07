import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";

import { db } from '../services/firebaseConnection.js';
import { collection, addDoc } from "firebase/firestore";

export default function Quarta() {

// Inicio da Função de Inserir Dados no TextInput
const [nomeVaga, setNomeVaga] = useState("");
const [nomeEmpresa, setNomeEmpresa] = useState("");
const [valorSalario, setValorSalario] = useState("");
const [descricao, setDescricao] = useState("");

const addVagaNoFirestore = async() => {
  try {
    const refColecao = await addDoc(collection(db, "vagas"),
  {
    nome: nomeVaga,
    empresa: nomeEmpresa,
    salario: valorSalario,
    descricaoVaga: descricao
  });
  console.log("Documento ID: ", refColecao.id);
  setNomeVaga("")
  setNomeEmpresa("")
  setValorSalario("")
  setDescricao("")
  }
  catch (error){
  console.error("Erro ao adicionar documento: ", error)
  };
};
// Fim da Função de Inserir Dados no TextInput

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá tela 4</Text>
      <TextInput
        value={nomeVaga}
        onChangeText={setNomeVaga}
        placeholder="Nome da Vaga"
        style={styles.input}
      />
      <TextInput
        value={nomeEmpresa}
        onChangeText={setNomeEmpresa}
        placeholder="Nome da Empresa"
        style={styles.input}
      />
      <TextInput
        value={valorSalario}
        onChangeText={setValorSalario}
        placeholder="Salário"
        style={styles.input}
      />
      <TextInput
        value={descricao}
        multiline
        numberOfLines={11}
        onChangeText={setDescricao}
        placeholder="Descrição da Vaga"
        style={styles.inputDesc}
      />
      <Button
        title="Adicionar"
        onPress={addVagaNoFirestore}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "70%"
  },
  inputDesc: {
    borderWidth: 1,
    padding: 10,
    margin: 12,
    width: "70%",
    height: '20%',
  },
});