import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { apiBaseUrl } from '../../lib/api';
import styles from './styles';

type Proprietario = {
  id_proprietario: number;
  nome: string;
  cpf: string;
};

export default function ProprietarioList() {
  const [items, setItems] = useState<Proprietario[]>([]);
  const router = useRouter();
  const { refresh } = useLocalSearchParams<{ refresh?: string }>();

  const fetchAll = useCallback(async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/proprietario`);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll, refresh]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiBaseUrl}/proprietario/${id}`);
      fetchAll();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Lista de Proprietários</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id_proprietario)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>{item.nome}</Text>
            <Text style={{ marginTop: 4, color: '#4b5563' }}>{item.cpf}</Text>

            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonGhost, { flex: 1 }]}
                onPress={() => router.push({ pathname: '/proprietario/edit', params: { id_proprietario: String(item.id_proprietario), nome: item.nome, cpf: item.cpf } })}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </Pressable>

              <Pressable style={[styles.button, styles.buttonDanger, { flex: 1 }]} onPress={() => handleDelete(item.id_proprietario)}>
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 20 }}>Nenhum proprietário cadastrado.</Text>}
      />

      <View style={{ padding: 16 }}>
        <Pressable style={styles.button} onPress={() => router.push('/proprietario/form')}>
          <Text style={styles.buttonText}>Novo Proprietário</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
