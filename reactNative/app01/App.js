import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Primeiro App</Text>
      <Text style={styles.subtitulo}>Aulas de Aplicativo 2</Text>
      
      <Text style={styles.paragrafo}>Vamos aprender com o Prof Mário</Text>
      <Text style={styles.textoDestaque}>
        Texto com várias configurações:
        {"\n"}- Tamanho grande{"\n"}- Negrito{"\n"}- Substituição de cor{"\n"}-
        Sombreamento
      </Text>
      <Text style={styles.rodape}>Feito com ❤️ para aprender React Native</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 20,
    color: "#555",
    marginBottom: 15,
  },
  paragrafo: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginHorizontal: 10,
    lineHeight: 24,
  },
  textoDestaque: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5722",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginVertical: 20,
  },
  rodape: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
  },
});
