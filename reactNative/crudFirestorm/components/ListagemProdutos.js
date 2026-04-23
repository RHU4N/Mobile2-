import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

function LivroItem({ item, onEditar, onSolicitarExcluir, styles }) {
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
        <TouchableOpacity style={styles.deleteButton} onPress={() => onSolicitarExcluir(item)}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ListagemProdutos({ produtos, onEditar, onExcluir, styles }) {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const fecharModal = () => setProdutoSelecionado(null);

  const confirmarExclusao = async () => {
    if (!produtoSelecionado) {
      return;
    }

    await onExcluir(produtoSelecionado.id);
    fecharModal();
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum livro cadastrado ainda.</Text>}
        renderItem={({ item }) => (
          <LivroItem
            item={item}
            onEditar={onEditar}
            onSolicitarExcluir={setProdutoSelecionado}
            styles={styles}
          />
        )}
      />

      <Modal transparent visible={!!produtoSelecionado} animationType="fade" onRequestClose={fecharModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir livro?</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir {produtoSelecionado?.titulo || "este livro"}?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={fecharModal}>
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalDeleteButton} onPress={confirmarExclusao}>
                <Text style={styles.modalDeleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
