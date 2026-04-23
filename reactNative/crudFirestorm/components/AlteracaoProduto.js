import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function AlteracaoProduto({ produto, onAlterar, onCancelar, styles }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (produto) {
      setTitulo(produto.titulo || "");
      setAutor(produto.autor || "");
      setAno(String(produto.ano ?? ""));
    }
  }, [produto]);

  if (!produto) {
    return null;
  }

  const atualizar = async () => {
    const tituloTratado = titulo.trim();
    const autorTratado = autor.trim();
    const anoNumerico = Number(String(ano).replace(/\D/g, ""));

    if (tituloTratado.length < 3) {
      setErro("Titulo precisa ter pelo menos 3 caracteres.");
      return;
    }

    if (autorTratado.length < 3) {
      setErro("Autor precisa ter pelo menos 3 caracteres.");
      return;
    }

    const anoAtual = new Date().getFullYear();
    if (Number.isNaN(anoNumerico) || anoNumerico < 1000 || anoNumerico > anoAtual) {
      setErro(`Ano deve ser entre 1000 e ${anoAtual}.`);
      return;
    }

    setErro("");
    await onAlterar(produto.id, tituloTratado, autorTratado, anoNumerico);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Alteracao de Livro</Text>
      <TextInput
        placeholder="Titulo do livro"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
        style={styles.input}
      />
      <TextInput
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
        style={styles.input}
      />
      {!!erro && <Text style={styles.errorText}>{erro}</Text>}

      <TouchableOpacity style={styles.warningButton} onPress={atualizar}>
        <Text style={styles.primaryButtonText}>Salvar alteracao</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onCancelar}>
        <Text style={styles.secondaryButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
