// App.js (versão curta)
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "./firebaseConfig";
import styles from "./styles";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export default function App() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "produtos"), orderBy("criadoEm", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProdutos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const limpar = () => {
    setNome("");
    setPreco("");
    setEditId(null);
  };

  const salvarOuAtualizar = async () => {
    if (!nome || !preco) return; // validação mínima
    const dados = { nome, preco: Number(preco) };

    if (editId) {
      await updateDoc(doc(db, "produtos", editId), dados);
    } else {
      await addDoc(collection(db, "produtos"), {
        ...dados,
        criadoEm: serverTimestamp(),
      });
    }
    limpar();
  };

  const remover = async (id) => {
    await deleteDoc(doc(db, "produtos", id));
  };

  const editar = (item) => {
    setEditId(item.id);
    setNome(item.nome);
    setPreco(String(item.preco));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CRUD Firestore (Expo) — Simples</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome do produto"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          placeholder="Preço (ex: 49.90)"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.botao,
            { backgroundColor: editId ? "#0066cc" : "#28a745" },
          ]}
          onPress={salvarOuAtualizar}
        >
          <Text style={styles.botaoTxt}>{editId ? "Atualizar" : "Salvar"}</Text>
        </TouchableOpacity>

        {editId && (
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: "#6c757d", marginTop: 8 }]}
            onPress={limpar}
          >
            <Text style={styles.botaoTxt}>Cancelar edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.subtitulo}>Lista de produtos</Text>

      <FlatList
        data={produtos}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text style={styles.cardLinha}>
                Preço: R$
                {Number(item.preco).toFixed(2)}
              </Text>
            </View>
            <View style={styles.acoes}>
              <TouchableOpacity
                style={[styles.acao, { backgroundColor: "#ffc107" }]}
                onPress={() => editar(item)}
              >
                <Text style={styles.acaoTxt}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.acao, { backgroundColor: "#dc3545" }]}
                onPress={() => remover(item.id)}
              >
                <Text style={styles.acaoTxt}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
