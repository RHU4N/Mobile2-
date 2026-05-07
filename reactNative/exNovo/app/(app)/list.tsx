import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/app/context/dataContext';

export default function ListScreen() {
  const router = useRouter();
  const { items, deleteItem } = useData();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Ativo', 'Inativo']);

  const filteredItems = items.filter(item => selectedFilters.includes(item.status));

  const handleEdit = (id: string) => {
    router.push({
      pathname: '/(app)/form',
      params: { mode: 'edit', id }
    });
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja deletar ${name}?`,
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Deletar',
          onPress: () => {
            deleteItem(id);
            Alert.alert('Sucesso', 'Registro deletado com sucesso!');
          },
          style: 'destructive',
        }
      ]
    );
  };

  const toggleFilter = (status: string) => {
    if (selectedFilters.includes(status)) {
      setSelectedFilters(selectedFilters.filter(s => s !== status));
    } else {
      setSelectedFilters([...selectedFilters, status]);
    }
  };

  const renderItem = ({ item }: { item: typeof items[0] }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'Ativo' ? '#4CAF50' : '#999' }
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailValue}>{item.email}</Text>

        <Text style={styles.detailLabel}>Telefone:</Text>
        <Text style={styles.detailValue}>{item.phone}</Text>
      </View>

      <View style={styles.itemActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item.id)}
        >
          <Text style={styles.actionButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id, item.name)}
        >
          <Text style={styles.actionButtonText}>🗑️ Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por Status:</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes('Ativo') && styles.filterButtonActive
            ]}
            onPress={() => toggleFilter('Ativo')}
          >
            <Text style={selectedFilters.includes('Ativo') ? styles.filterButtonTextActive : styles.filterButtonText}>
              Ativos ({items.filter(i => i.status === 'Ativo').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes('Inativo') && styles.filterButtonActive
            ]}
            onPress={() => toggleFilter('Inativo')}
          >
            <Text style={selectedFilters.includes('Inativo') ? styles.filterButtonTextActive : styles.filterButtonText}>
              Inativos ({items.filter(i => i.status === 'Inativo').length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
          <Text style={styles.emptySubtext}>Tente ajustar os filtros</Text>
        </View>
      )}

      <View style={styles.bottomInfo}>
        <Text style={styles.infoText}>
          Total: {filteredItems.length} de {items.length} registros
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FE',
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#0A7EA4',
    borderColor: '#0A7EA4',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    marginBottom: 12,
  },
  itemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  statusText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  itemDetails: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginTop: 6,
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    marginTop: 2,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  bottomInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});
