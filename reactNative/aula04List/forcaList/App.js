// imports
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  SectionList,
  Alert,
} from "react-native";
import styles from "./styles";

export default function App() {
  //useState
  const [mass, setMass] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [lightObjects, setLightObjects] = useState([]);
  const [mediumObjects, setMediumObjects] = useState([]);
  const [heavyObjects, setHeavyObjects] = useState([]);

  // Calcular força e adicionar ao resultado apropriado
  const calculateForce = () => {
    if (!mass.trim() || !acceleration.trim()) {
      Alert.alert("Erro", "Digite a massa e a aceleração!");
      return;
    }

    // variaveis
    const m = parseFloat(mass);
    const a = parseFloat(acceleration);

    //ve se é positivo
    if (m <= 0 || a <= 0) {
      Alert.alert("Erro", "Massa e aceleração devem ser maiores que zero!");
      return;
    }

    // Calcular força: F = m * a
    const f = (m * a).toFixed(2);

    // Criar um novo resultado
    const newResult = {
      id: Date.now().toString(),
      mass: m.toFixed(2),
      acceleration: a.toFixed(2),
      force: f,
    };

    // Categorizar por massa
    if (m < 10) {
      setLightObjects([...lightObjects, newResult]);
    } else if (m <= 50) {
      setMediumObjects([...mediumObjects, newResult]);
    } else {
      setHeavyObjects([...heavyObjects, newResult]);
    }

    setMass("");
    setAcceleration("");
  };

  // Limpar todas as listas
  const clearAllLists = () => {
    if (lightObjects.length === 0 && mediumObjects.length === 0 && heavyObjects.length === 0) {
      Alert.alert("Aviso", "A lista já está vazia!");
      return;
    }
    setLightObjects([]);
    setMediumObjects([]);
    setHeavyObjects([]);
  };

  // Renderizar cada item
  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultText}>Massa: {item.mass} kg</Text>
      <Text style={styles.resultText}>Aceleração: {item.acceleration} m/s²</Text>
      <Text style={styles.forceText}>Força: {item.force} N</Text>
    </View>
  );

  // Renderizar o título da seção
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  // Preparar dados para SectionList
  const sections = [
    {
      title: "Leve (< 10 kg)",
      data: lightObjects,
      color: "#4CAF50",
    },
    {
      title: "Médio (10-50 kg)",
      data: mediumObjects,
      color: "#FF9800",
    },
    {
      title: "Pesado (> 50 kg)",
      data: heavyObjects,
      color: "#E53935",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calculadora de Força (F = m*a)</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Massa (kg)"
          value={mass}
          onChangeText={setMass}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Aceleração (m/s²)"
          value={acceleration}
          onChangeText={setAcceleration}
          keyboardType="decimal-pad"
        />
        <Pressable style={styles.addButton} onPress={calculateForce}>
          <Text style={styles.addButtonText}>Calcular Força</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        {lightObjects.length === 0 && mediumObjects.length === 0 && heavyObjects.length === 0 ? (
          <Text style={styles.noTaskText}>Nenhum cálculo realizado!</Text>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
        )}
      </View>

      <Pressable style={styles.clearButton} onPress={clearAllLists}>
        <Text style={styles.clearButtonText}>Limpar Lista</Text>
      </Pressable>
    </View>
  );
}
