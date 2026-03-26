import React from "react";
import { View, Text, StyleSheet } from "react-native";

const aulas = ["Navegacao Stack", "Navegacao Tab", "Navegacao Drawer", "Form com validacao"];

export default function AulasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Roteiro da atividade</Text>
      {aulas.map((item) => (
        <View key={item} style={styles.itemCard}>
          <Text style={styles.itemTitle}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FD",
    padding: 20,
    gap: 10,
  },
  heading: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "800",
    color: "#1E2D3D",
    marginBottom: 8,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#147EFB",
    borderRadius: 12,
  },
  itemTitle: {
    fontSize: 16,
    color: "#2A4158",
    fontWeight: "600",
  },
});
