import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {
  cadastrar as cadastrarUsuario,
  entrar as entrarUsuario,
} from "../services/authService";

function traduzirErroAuth(codigo) {
  switch (codigo) {
    case "auth/invalid-email":
      return "Email invalido.";
    case "auth/invalid-credential":
      return "Email ou senha incorretos.";
    case "auth/operation-not-allowed":
      return "Ative o provedor Email/Senha no Firebase Auth.";
    case "auth/unauthorized-domain":
      return "Autorize o dominio atual no Firebase Auth.";
    case "auth/user-not-found":
      return "Usuario nao encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    case "auth/email-already-in-use":
      return "Este email ja esta em uso.";
    case "auth/weak-password":
      return "A senha precisa ter pelo menos 6 caracteres.";
    case "auth/network-request-failed":
      return "Falha de rede. Verifique sua conexao.";
    default:
      return "Nao foi possivel autenticar. Tente novamente.";
  }
}

function extrairCodigoErro(erro) {
  return erro?.code || erro?.name || "unknown-error";
}

export default function LoginScreen({ styles }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const validarCampos = () => {
    if (!email || !senha) {
      setErro("Preencha email e senha.");
      return false;
    }

    const emailValido = /^\S+@\S+\.\S+$/.test(email.trim());
    if (!emailValido) {
      setErro("Digite um email valido.");
      return false;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter no minimo 6 caracteres.");
      return false;
    }

    setErro("");
    return true;
  };

  const entrar = async () => {
    if (!validarCampos()) {
      return;
    }

    try {
      setCarregando(true);
      await entrarUsuario(email, senha);
    } catch (e) {
      const codigo = extrairCodigoErro(e);
      setErro(`${traduzirErroAuth(codigo)} (${codigo})`);
    } finally {
      setCarregando(false);
    }
  };

  const cadastrar = async () => {
    if (!validarCampos()) {
      return;
    }

    try {
      setCarregando(true);
      await cadastrarUsuario(email, senha);
    } catch (e) {
      const codigo = extrairCodigoErro(e);
      setErro(`${traduzirErroAuth(codigo)} (${codigo})`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.loginHint}>Entre com Firebase Auth ou crie sua conta.</Text>
      <Text style={styles.loginHintSmall}>Se aparecer erro de auth/operation-not-allowed, ative Email/Senha no console do Firebase.</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      {!!erro && <Text style={styles.errorText}>{erro}</Text>}

      <TouchableOpacity style={styles.primaryButton} onPress={entrar} disabled={carregando}>
        <Text style={styles.primaryButtonText}>{carregando ? "Aguarde..." : "Entrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={cadastrar} disabled={carregando}>
        <Text style={styles.secondaryButtonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}
