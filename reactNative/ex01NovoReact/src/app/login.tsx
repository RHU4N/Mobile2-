import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (usuario === "admin" && senha === "123") {
      router.replace("/menu");
    } else if(!usuario.trim() || !senha.trim()) {
      if (Platform.OS === "web") {
        // eslint-disable-next-line no-restricted-globals
        alert("Atenção: Preencha usuário e senha.");
      } else {
        Alert.alert("Atenção", "Preencha usuário e senha.");
      }
    } else {
      if (Platform.OS === "web") {
        // eslint-disable-next-line no-restricted-globals
        alert("Atenção: Usuário ou senha incorretos.");
      } else {
        Alert.alert("Atenção", "Usuário ou senha incorretos.");
      }
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Cadastro</Text>
      <Text style={styles.subtitulo}>Login simples para acessar o menu.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
          placeholder="Digite o usuário"
          placeholderTextColor="#8a95a8"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite a senha"
          placeholderTextColor="#8a95a8"
          secureTextEntry
        />

        <Pressable style={styles.botao} onPress={entrar}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef3fb",
    padding: 24,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#10233f",
  },
  subtitulo: {
    marginTop: 8,
    marginBottom: 20,
    color: "#5d6b82",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: "700",
    color: "#10233f",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d7dfed",
    backgroundColor: "#f8fbff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  botao: {
    marginTop: 18,
    backgroundColor: "#1f5eff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "800",
  },
});
