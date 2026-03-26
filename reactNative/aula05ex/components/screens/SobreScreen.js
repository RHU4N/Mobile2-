import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o app</Text>
      <Text style={styles.paragraph}>
        Este exercicio demonstra navegacao combinada usando React Navigation.
      </Text>
      <Text style={styles.paragraph}>
        O Drawer organiza areas principais, as Tabs facilitam acesso rapido e o Stack controla o fluxo de formulario.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF4FA",
    padding: 22,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#22354B",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 23,
    color: "#40566F",
    marginBottom: 12,
  },
});
