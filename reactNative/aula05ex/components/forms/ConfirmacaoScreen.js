import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ConfirmacaoScreen({ route, navigation }) {
  const { nome, email, curso } = route.params ?? {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmacao</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{nome || "-"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email || "-"}</Text>

        <Text style={styles.label}>Curso</Text>
        <Text style={styles.value}>{curso || "-"}</Text>
      </View>

      <Pressable style={styles.buttonGhost} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonGhostText}>Editar dados</Text>
      </Pressable>

      <Pressable
        style={styles.buttonSolid}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text style={styles.buttonSolidText}>Finalizar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FF",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1D3450",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#1A2A38",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 14,
    elevation: 4,
  },
  label: {
    fontSize: 13,
    color: "#5D7287",
    marginTop: 8,
  },
  value: {
    fontSize: 17,
    color: "#16324E",
    fontWeight: "700",
    marginTop: 2,
  },
  buttonGhost: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1276E8",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonGhostText: {
    color: "#1276E8",
    fontWeight: "700",
  },
  buttonSolid: {
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#1276E8",
    alignItems: "center",
  },
  buttonSolidText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
