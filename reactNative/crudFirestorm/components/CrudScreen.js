import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { sair } from "../services/authService";

export default function CrudScreen({ usuario, navigation, styles }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.appHeader}>
        <Text style={styles.titulo}>Biblioteca de Livros</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={sair}>
          <Text style={styles.secondaryButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.userText}>Usuario: {usuario?.email || ""}</Text>
      <Text style={styles.themeText}>
        Escolha uma tela para cadastrar, listar ou alterar livros.
      </Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.menuButtonText}>Cadastrar livro</Text>
          <Text style={styles.menuButtonDescription}>Abrir a tela de cadastro.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("Listagem")}>
          <Text style={styles.menuButtonText}>Listar livros</Text>
          <Text style={styles.menuButtonDescription}>Ver, editar e excluir registros.</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
