import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={[styles.shape, styles.shapeOne]} />
      <View style={[styles.shape, styles.shapeTwo]} />

      <View style={styles.card}>
        <Text style={styles.title}>App de Navegacao</Text>
        <Text style={styles.subtitle}>
          Drawer + Bottom Tab + Stack em um unico projeto React Native.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Fluxo Formulario")}
        >
          <Text style={styles.buttonText}>Abrir fluxo de formulario</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  shape: {
    position: "absolute",
    borderRadius: 999,
  },
  shapeOne: {
    width: 220,
    height: 220,
    backgroundColor: "#DDEBFF",
    top: -60,
    right: -30,
  },
  shapeTwo: {
    width: 180,
    height: 180,
    backgroundColor: "#CDEFD6",
    bottom: -50,
    left: -30,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    shadowColor: "#18314F",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#17324D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4C627A",
    marginBottom: 20,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#147EFB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
