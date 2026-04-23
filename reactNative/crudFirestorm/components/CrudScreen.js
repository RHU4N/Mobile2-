import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AlteracaoProduto from "./AlteracaoProduto";
import CadastroProduto from "./CadastroProduto";
import ListagemProdutos from "./ListagemProdutos";
import {
  alterarLivro,
  cadastrarLivro,
  excluirLivro,
  listarLivros,
} from "../services/produtoService";
import { sair } from "../services/authService";

export default function CrudScreen({ usuario, styles }) {
  const [livros, setLivros] = useState([]);
  const [livroEditando, setLivroEditando] = useState(null);

  useEffect(() => {
    const unsubscribe = listarLivros(setLivros);
    return unsubscribe;
  }, []);

  const handleCadastrar = async (titulo, autor, ano) => {
    await cadastrarLivro(titulo, autor, ano);
  };

  const handleAlterar = async (id, titulo, autor, ano) => {
    await alterarLivro(id, titulo, autor, ano);
    setLivroEditando(null);
  };

  const handleExcluir = async (id) => {
    try {
      await excluirLivro(id);
      if (livroEditando?.id === id) {
        setLivroEditando(null);
      }
    } catch (error) {
      const codigo = error?.code || "unknown-error";
      Alert.alert(
        "Erro ao excluir",
        `Nao foi possivel excluir o livro. ${codigo}`
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.appHeader}>
        <Text style={styles.titulo}>Biblioteca de Livros</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={sair}>
          <Text style={styles.secondaryButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.userText}>Usuario: {usuario?.email || ""}</Text>
      <Text style={styles.themeText}>Tema: cadastro, alteracao, listagem e exclusao de livros</Text>

      <View style={styles.crudBody}>
        <CadastroProduto onCadastrar={handleCadastrar} styles={styles} />
        <AlteracaoProduto
          produto={livroEditando}
          onAlterar={handleAlterar}
          onCancelar={() => setLivroEditando(null)}
          styles={styles}
        />
        <ListagemProdutos
          produtos={livros}
          onEditar={setLivroEditando}
          onExcluir={handleExcluir}
          styles={styles}
        />
      </View>
    </SafeAreaView>
  );
}
