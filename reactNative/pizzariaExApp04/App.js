import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';

const pizzaItems = [
  { label: 'Mussarela - R$ 35,00', value: 'mussarela' },
  { label: 'Calabresa - R$ 40,00', value: 'calabresa' },
  { label: 'Frango c/ Catupiry - R$ 45,00', value: 'frangoCatupiry' },
  { label: 'Portuguesa - R$ 48,00', value: 'portuguesa' },
];

const pizzaPrecos = {
  mussarela: 35,
  calabresa: 40,
  frangoCatupiry: 45,
  portuguesa: 48,
};

const bebidaPrecos = {
  refrigerante: 8,
  suco: 7,
  agua: 4,
};

const precoBorda = 6;

function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [sabor, setSabor] = useState(null);
  const [items, setItems] = useState(pizzaItems);

  const [refrigerante, setRefrigerante] = useState(false);
  const [suco, setSuco] = useState(false);
  const [agua, setAgua] = useState(false);

  const [borda, setBorda] = useState('sem');
  const [resultado, setResultado] = useState('Selecione os itens e toque em "Calcular total".');

  const calcularTotal = () => {
    if (!sabor) {
      setResultado('Selecione o sabor da pizza para calcular o pedido.');
      return;
    }

    let total = pizzaPrecos[sabor] || 0;

    if (refrigerante) total += bebidaPrecos.refrigerante;
    if (suco) total += bebidaPrecos.suco;
    if (agua) total += bebidaPrecos.agua;
    if (borda === 'com') total += precoBorda;

    setResultado(`Valor final do pedido: ${formatarMoeda(total)}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Pizzaria App</Text>

        <Text style={styles.subtitulo}>1) Escolha o sabor da pizza</Text>
        <View style={styles.dropdownWrap}>
          <DropDownPicker
            open={open}
            value={sabor}
            items={items}
            setOpen={setOpen}
            setValue={setSabor}
            setItems={setItems}
            placeholder="Selecione um sabor"
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <Text style={styles.subtitulo}>2) Escolha as bebidas</Text>
        <CheckBox
          title="Refrigerante (+ R$ 8,00)"
          checked={refrigerante}
          onPress={() => setRefrigerante(!refrigerante)}
          containerStyle={styles.checkbox}
        />
        <CheckBox
          title="Suco (+ R$ 7,00)"
          checked={suco}
          onPress={() => setSuco(!suco)}
          containerStyle={styles.checkbox}
        />
        <CheckBox
          title="Água (+ R$ 4,00)"
          checked={agua}
          onPress={() => setAgua(!agua)}
          containerStyle={styles.checkbox}
        />

        <Text style={styles.subtitulo}>3) Pizza com borda?</Text>
        <RadioButton.Group onValueChange={setBorda} value={borda}>
          <View style={styles.radioLinha}>
            <RadioButton value="com" />
            <Text>Com borda (+ R$ 6,00)</Text>
          </View>
          <View style={styles.radioLinha}>
            <RadioButton value="sem" />
            <Text>Sem borda</Text>
          </View>
        </RadioButton.Group>

        <View style={styles.botaoWrap}>
          <Button title="Calcular total" onPress={calcularTotal} />
        </View>

        <Text style={styles.resultado}>{resultado}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f5f7',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1d3557',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    color: '#2f4858',
  },
  dropdownWrap: {
    marginBottom: 10,
    zIndex: 3000,
  },
  checkbox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#dfe4ea',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 4,
    marginBottom: 4,
  },
  radioLinha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoWrap: {
    marginTop: 16,
  },
  resultado: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: '#0b5d1e',
    backgroundColor: '#e9f8ec',
    borderRadius: 8,
    padding: 12,
  },
});
