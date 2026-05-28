import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { apiBaseUrl } from '../../lib/api';
import styles from './styles';

export default function ProprietarioForm() {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post(`${apiBaseUrl}/proprietario`, { nome, cpf });
      router.replace(`/proprietario?refresh=${Date.now()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Cadastrar Proprietário</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} placeholder="Digite o nome" value={nome} onChangeText={setNome} />

        <Text style={styles.label}>CPF</Text>
        <TextInput style={styles.input} placeholder="Digite o CPF" value={cpf} onChangeText={setCPF} keyboardType="numeric" />

        <View style={{ marginTop: 22 }}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
