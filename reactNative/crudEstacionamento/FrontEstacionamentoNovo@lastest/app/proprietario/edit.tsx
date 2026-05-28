import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { apiBaseUrl } from '../../lib/api';
import styles from './styles';

export default function ProprietarioEdit() {
  const params = useLocalSearchParams<{ id_proprietario?: string; nome?: string; cpf?: string }>();
  const [proprietario, setProprietario] = useState({
    id_proprietario: params.id_proprietario ?? '',
    nome: params.nome ?? '',
    cpf: params.cpf ?? '',
  });
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.put(`${apiBaseUrl}/proprietario/${proprietario.id_proprietario}`, proprietario);
      router.replace(`/proprietario?refresh=${Date.now()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Editar Proprietário</Text>

        <Text style={styles.label}>Identificação</Text>
        <TextInput style={styles.input} editable={false} value={String(proprietario.id_proprietario)} />

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={proprietario.nome} onChangeText={(nome) => setProprietario((prev) => ({ ...prev, nome }))} />

        <Text style={styles.label}>CPF</Text>
        <TextInput style={styles.input} value={proprietario.cpf} onChangeText={(cpf) => setProprietario((prev) => ({ ...prev, cpf }))} keyboardType="numeric" />

        <View style={{ marginTop: 22 }}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Alterar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
