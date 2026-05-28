import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { apiBaseUrl } from '../../lib/api';
import styles from './styles';

type Veiculo = {
  id_veiculo: number;
  placa: string;
  ano: number;
  mensalidade: string | number;
  fk_proprietario: number;
};

export default function VeiculoList() {
  const [items, setItems] = useState<Veiculo[]>([]);
  const router = useRouter();
  const { refresh } = useLocalSearchParams<{ refresh?: string }>();

  const fetchAll = useCallback(async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/veiculo`);
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
      await axios.delete(`${apiBaseUrl}/veiculo/${id}`);
      fetchAll();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Lista de Veículos</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id_veiculo)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>{item.placa}</Text>
            <Text style={{ marginTop: 4, color: '#4b5563' }}>Ano: {item.ano}</Text>
            <Text style={{ marginTop: 4, color: '#4b5563' }}>Mensalidade: {item.mensalidade}</Text>
            <Text style={{ marginTop: 4, color: '#4b5563' }}>Proprietário: {item.fk_proprietario}</Text>

            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.buttonGhost, { flex: 1 }]}
                onPress={() => router.push({ pathname: '/veiculo/edit', params: { id_veiculo: String(item.id_veiculo), placa: item.placa, ano: String(item.ano), mensalidade: String(item.mensalidade), fk_proprietario: String(item.fk_proprietario) } })}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </Pressable>

              <Pressable style={[styles.button, styles.buttonDanger, { flex: 1 }]} onPress={() => handleDelete(item.id_veiculo)}>
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 20 }}>Nenhum veículo cadastrado.</Text>}
      />

      <View style={{ padding: 16 }}>
        <Pressable style={styles.button} onPress={() => router.push('/veiculo/form')}>
          <Text style={styles.buttonText}>Novo Veículo</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
