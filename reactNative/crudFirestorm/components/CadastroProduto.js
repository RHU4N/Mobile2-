import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function CadastroProduto({ onCadastrar, styles }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [erro, setErro] = useState("");

  const validar = () => {
    const tituloTratado = titulo.trim();
    const autorTratado = autor.trim();
    const anoNumerico = Number(String(ano).replace(/\D/g, ""));

    if (tituloTratado.length < 3) {
      setErro("Titulo precisa ter pelo menos 3 caracteres.");
      return null;
    }

    if (autorTratado.length < 3) {
      setErro("Autor precisa ter pelo menos 3 caracteres.");
      return null;
    }

    const anoAtual = new Date().getFullYear();
    if (Number.isNaN(anoNumerico) || anoNumerico < 1000 || anoNumerico > anoAtual) {
      setErro(`Ano deve ser entre 1000 e ${anoAtual}.`);
      return null;
    }

    setErro("");
    return { titulo: tituloTratado, autor: autorTratado, ano: anoNumerico };
  };

  const salvar = async () => {
    const dadosValidados = validar();
    if (!dadosValidados) {
      return;
    }

    await onCadastrar(dadosValidados.titulo, dadosValidados.autor, dadosValidados.ano);
    setTitulo("");
    setAutor("");
    setAno("");
    setErro("");
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Cadastro de Livro</Text>
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
      <TouchableOpacity style={styles.primaryButton} onPress={salvar}>
        <Text style={styles.primaryButtonText}>Cadastrar livro</Text>
      </TouchableOpacity>
    </View>
  );
}
