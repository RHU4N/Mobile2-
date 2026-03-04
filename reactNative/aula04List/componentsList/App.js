import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import styles from "./styles"; // Importando os estilos

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) {
      Alert.alert("Erro", "Digite uma tarefa válida!");
      return;
    }
    //O operador spread (...) copia todos os elementos da lista atual (prevTasks) para um novo array.
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), title: task },
    ]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.title}</Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gerenciador de Tarefas</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa"
          value={task}
          onChangeText={setTask}
        />
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
      </View>
      <View style={styles.listContainer}>
        {tasks.length === 0 ? (
          <Text style={styles.noTaskText}>Nenhuma tarefa adicionada!</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
}
