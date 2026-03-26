import React, { useMemo, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";

export default function FormularioScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");

  const podeEnviar = useMemo(() => {
    return nome.trim().length >= 3 && email.includes("@") && curso.trim().length > 1;
  }, [nome, email, curso]);

  function enviarFormulario() {
    if (!podeEnviar) {
      Alert.alert("Campos invalidos", "Preencha nome, email e curso corretamente.");
      return;
    }

    navigation.navigate("Confirmacao", {
      nome: nome.trim(),
      email: email.trim(),
      curso: curso.trim(),
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Formulario de matricula</Text>

      <TextInput
        placeholder="Nome completo"
        placeholderTextColor="#7A8C9E"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#7A8C9E"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Curso"
        placeholderTextColor="#7A8C9E"
        style={styles.input}
        value={curso}
        onChangeText={setCurso}
      />

      <Pressable
        style={[styles.button, !podeEnviar && styles.buttonDisabled]}
        onPress={enviarFormulario}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBFF",
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C314A",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9E3EE",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#1276E8",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
