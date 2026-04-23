import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import ListagemProdutos from "./ListagemProdutos";
import { excluirLivro, listarLivros } from "../services/produtoService";

export default function ListagemScreen({ navigation, styles }) {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const unsubscribe = listarLivros(setLivros);
    return unsubscribe;
  }, []);

  const handleEditar = (produto) => {
    navigation.navigate("Alteracao", { produto });
  };

  const handleExcluir = async (id) => {
    try {
      await excluirLivro(id);
    } catch (error) {
      const codigo = error?.code || "unknown-error";
      Alert.alert("Erro ao excluir", `Nao foi possivel excluir o livro. ${codigo}`);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.appHeader}>
        <Text style={styles.titulo}>Listagem de livros</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.themeText}>Edite um item ou abra o modal para confirmar a exclusao.</Text>

      <View style={styles.crudBody}>
        <ListagemProdutos
          produtos={livros}
          onEditar={handleEditar}
          onExcluir={handleExcluir}
          styles={styles}
        />
      </View>
    </SafeAreaView>
  );
}