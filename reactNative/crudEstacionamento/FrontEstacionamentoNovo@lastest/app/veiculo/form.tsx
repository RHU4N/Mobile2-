import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { apiBaseUrl } from '../../lib/api';
import styles from './styles';

type Proprietario = {
  id_proprietario: number;
  nome: string;
  cpf: string;
};

export default function VeiculoForm() {
  const [placa, setPlaca] = useState('');
  const [ano, setAno] = useState('');
  const [mensalidade, setMensalidade] = useState('');
  const [fkProprietario, setFkProprietario] = useState('');
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const router = useRouter();

  const fetchProprietarios = useCallback(async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/proprietario`);
      setProprietarios(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProprietarios();
  }, [fetchProprietarios]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${apiBaseUrl}/veiculo`, {
        placa,
        ano: Number(ano),
        mensalidade: Number(mensalidade),
        fk_proprietario: Number(fkProprietario),
      });
      router.replace(`/veiculo?refresh=${Date.now()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Cadastrar Veículo</Text>

        <Text style={styles.label}>Placa</Text>
        <TextInput style={styles.input} placeholder="Digite a placa" value={placa} onChangeText={setPlaca} />

        <Text style={styles.label}>Ano</Text>
        <TextInput style={styles.input} placeholder="Digite o ano" value={ano} onChangeText={setAno} keyboardType="numeric" />

        <Text style={styles.label}>Mensalidade</Text>
        <TextInput style={styles.input} placeholder="Digite a mensalidade" value={mensalidade} onChangeText={setMensalidade} keyboardType="numeric" />

        <Text style={styles.label}>Proprietário</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={fkProprietario} onValueChange={(value) => setFkProprietario(String(value))}>
            <Picker.Item label="Selecione um proprietário" value="" />
            {proprietarios.map((item) => (
              <Picker.Item key={item.id_proprietario} label={`${item.nome} - ${item.cpf}`} value={String(item.id_proprietario)} />
            ))}
          </Picker>
        </View>

        <View style={{ marginTop: 22 }}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
