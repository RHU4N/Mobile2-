import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

function LivroItem({ item, onEditar, onExcluir, styles }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.titulo || "Sem titulo"}</Text>
        <Text style={styles.cardText}>Autor: {item.autor || "Nao informado"}</Text>
        <Text style={styles.cardText}>Ano: {item.ano || "-"}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEditar(item)}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onExcluir(item.id)}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ListagemProdutos({ produtos, onEditar, onExcluir, styles }) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum livro cadastrado ainda.</Text>}
        renderItem={({ item }) => (
          <LivroItem item={item} onEditar={onEditar} onExcluir={onExcluir} styles={styles} />
        )}
      />
    </View>
  );
}
