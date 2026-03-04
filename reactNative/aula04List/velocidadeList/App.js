// imports
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import styles from "./styles";

// inicio do sistema

export default function App() {
  // useState para armazenar os valores de distância, tempo e resultados
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);

  // calcular a velocidade média e adicionar o resultado à lista
  const calculateVelocity = () => {
    if (!distance.trim() || !time.trim()) {
      Alert.alert("Erro", "Digite a distância e o tempo!");
      return;
    }

    // variáveis para calcular a velocidade média
    const d = parseFloat(distance);
    const t = parseFloat(time);

    // validação para garantir que os valores sejam positivos
    if (d <= 0 || t <= 0) {
      Alert.alert("Erro", "Distância e tempo devem ser maiores que zero!");
      return;
    }

//calcular a velocidade média e formatar para 2 casas decimais
    const v = (d / t).toFixed(2);

    //useState para atualizar a lista de resultados com o novo cálculo
    setResults((prevResults) => [
      ...prevResults,
      {
        id: Date.now().toString(),
        distance: d.toFixed(2),
        time: t.toFixed(2),
        velocity: v,
      },
    ]);

    setDistance("");
    setTime("");
  };

  // função para limpar a lista de resultados
  const clearList = () => {
    if (results.length === 0) {
      Alert.alert("Aviso", "A lista já está vazia!");
      return;
    }
    setResults([]);
  };

  // função para renderizar cada item da lista de resultados
  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultText}>Distância: {item.distance} m</Text>
      <Text style={styles.resultText}>Tempo: {item.time} s</Text>
      <Text style={styles.velocityText}>Velocidade: {item.velocity} m/s</Text>
    </View>
  );

  // estrutura da interface do usuário
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calculadora de Velocidade Média</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Distância (metros)"
          value={distance}
          onChangeText={setDistance}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Tempo (segundos)"
          value={time}
          onChangeText={setTime}
          keyboardType="decimal-pad"
        />
        <Pressable style={styles.addButton} onPress={calculateVelocity}>
          <Text style={styles.addButtonText}>Calcular</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        {results.length === 0 ? (
          <Text style={styles.noTaskText}>Nenhum cálculo realizado!</Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>

      <Pressable style={styles.clearButton} onPress={clearList}>
        <Text style={styles.clearButtonText}>Limpar Lista</Text>
      </Pressable>
    </View>
  );
}