import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function App() {
  const [altura, setAltura] = useState("");
  const [largura, setLargura] = useState("");
  const [resultado, setResultado] = useState("");

  const handleReta = () => {
    const areaR = parseFloat(altura) * parseFloat(largura);
    setResultado(`Area do retangulo: ${areaR}`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://placehold.co/150" }}
        style={styles.image}
      />
      <Text style={styles.title}>Calculando a Area do retangulo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a altura do retangulo"
        keyboardType="numeric"
        value={altura}
        onChangeText={(text) => setAltura(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a largura do retangulo"
        keyboardType="numeric"
        value={largura}
        onChangeText={(text) => setLargura(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReta}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.result}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    width: "80%",
    alignItems: "center",
    
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
