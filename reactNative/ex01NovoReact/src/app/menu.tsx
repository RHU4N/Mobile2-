import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Cliente = {
  id: string;
  nome: string;
  telefone: string;
};

export default function Menu() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: "1", nome: "Ana Souza", telefone: "(11) 99999-1111" },
    { id: "2", nome: "Bruno Lima", telefone: "(21) 98888-2222" },
  ]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setEditandoId(null);
  }

  function salvar() {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert("Atenção", "Preencha nome e telefone.");
      return;
    }

    if (editandoId) {
      setClientes((atual) =>
        atual.map((item) =>
          item.id === editandoId ? { ...item, nome, telefone } : item,
        ),
      );
      Alert.alert("Sucesso", "Cadastro alterado.");
    } else {
      setClientes((atual) => [
        { id: String(Date.now()), nome, telefone },
        ...atual,
      ]);
      Alert.alert("Sucesso", "Cadastro feito.");
    }

    limparFormulario();
  }

  function editar(cliente: Cliente) {
    setNome(cliente.nome);
    setTelefone(cliente.telefone);
    setEditandoId(cliente.id);
  }

  function excluir(id: string) {
    // fallback for web where native Alert might not behave as expected
    if (Platform.OS === "web") {
      // eslint-disable-next-line no-restricted-globals
      const ok = confirm("Deseja apagar este cadastro?");
      if (!ok) return;
      console.log("excluir web", id);
      setClientes((atual) => atual.filter((item) => item.id !== id));
      if (editandoId === id) limparFormulario();
      return;
    }

    Alert.alert("Excluir", "Deseja apagar este cadastro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          console.log("excluir", id);
          setClientes((atual) => atual.filter((item) => item.id !== id));
          if (editandoId === id) {
            limparFormulario();
          }
        },
      },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Menu</Text>
      <Text style={styles.subtitulo}>Cadastrar e gerenciar dados locais.</Text>

      <View style={styles.card}>
        <Text style={styles.secTitulo}>Cadastrar</Text>

        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          placeholderTextColor="#8a95a8"
        />

        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Telefone"
          placeholderTextColor="#8a95a8"
        />

        <Pressable style={styles.botao} onPress={salvar}>
          <Text style={styles.botaoTexto}>
            {editandoId ? "Alterar" : "Salvar"}
          </Text>
        </Pressable>

        {editandoId ? (
          <Pressable style={styles.botaoSecundario} onPress={limparFormulario}>
            <Text style={styles.botaoSecTexto}>Cancelar edição</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.secTitulo}>Gerenciar</Text>

        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum cadastro.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.telefone}>{item.telefone}</Text>
              </View>

              <View style={styles.acoes}>
                <Pressable style={styles.acao} onPress={() => editar(item)}>
                  <Text style={styles.acaoTexto}>Editar</Text>
                </Pressable>
                <Pressable
                  style={styles.acaoExcluir}
                  onPress={() => excluir(item.id)}
                >
                  <Text style={styles.acaoExcluirTexto}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>

      <Pressable style={styles.sair} onPress={() => router.replace("/login")}>
        <Text style={styles.sairTexto}>Sair</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef3fb",
  },
  content: {
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#10233f",
  },
  subtitulo: {
    marginTop: 6,
    marginBottom: 18,
    color: "#5d6b82",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  secTitulo: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
    color: "#10233f",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d7dfed",
    backgroundColor: "#f8fbff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#1f5eff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "800",
  },
  botaoSecundario: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#eaf0ff",
  },
  botaoSecTexto: {
    color: "#1f5eff",
    fontWeight: "800",
  },
  vazio: {
    color: "#5d6b82",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eef2f7",
  },
  nome: {
    fontWeight: "800",
    color: "#10233f",
  },
  telefone: {
    color: "#5d6b82",
    marginTop: 2,
  },
  acoes: {
    gap: 8,
  },
  acao: {
    backgroundColor: "#eaf0ff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  acaoTexto: {
    color: "#1f5eff",
    fontWeight: "800",
  },
  acaoExcluir: {
    backgroundColor: "#fdecec",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  acaoExcluirTexto: {
    color: "#b42318",
    fontWeight: "800",
  },
  sair: {
    paddingVertical: 14,
    alignItems: "center",
  },
  sairTexto: {
    color: "#b42318",
    fontWeight: "800",
  },
});
