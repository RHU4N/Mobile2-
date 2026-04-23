import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AlteracaoProduto from "./AlteracaoProduto";
import { alterarLivro } from "../services/produtoService";

export default function AlteracaoScreen({ navigation, route, styles }) {
  const produto = route?.params?.produto || null;

  const handleAlterar = async (id, titulo, autor, ano) => {
    await alterarLivro(id, titulo, autor, ano);
    navigation.navigate("Listagem");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.appHeader}>
        <Text style={styles.titulo}>Alterar livro</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {!produto ? (
        <View style={styles.emptyStateCard}>
          <Text style={styles.emptyStateTitle}>Nenhum livro selecionado</Text>
          <Text style={styles.emptyStateText}>
            Abra a listagem e escolha a opção editar em um livro para carregar os dados aqui.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Listagem")}>
            <Text style={styles.primaryButtonText}>Ir para listagem</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.themeText}>Atualize os campos e confirme a alteração.</Text>
          <AlteracaoProduto
            produto={produto}
            onAlterar={handleAlterar}
            onCancelar={() => navigation.goBack()}
            styles={styles}
          />
        </>
      )}
    </SafeAreaView>
  );
}