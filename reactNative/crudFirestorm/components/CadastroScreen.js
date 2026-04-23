import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import CadastroProduto from "./CadastroProduto";
import { cadastrarLivro } from "../services/produtoService";

export default function CadastroScreen({ navigation, styles }) {
  const handleCadastrar = async (titulo, autor, ano) => {
    await cadastrarLivro(titulo, autor, ano);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.appHeader}>
        <Text style={styles.titulo}>Cadastrar livro</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.themeText}>Preencha os dados e salve para voltar a tela inicial.</Text>

      <CadastroProduto onCadastrar={handleCadastrar} styles={styles} />
    </SafeAreaView>
  );
}