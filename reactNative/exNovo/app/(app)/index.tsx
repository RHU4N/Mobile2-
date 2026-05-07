import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/context/authContext';
import { useData } from '@/app/context/dataContext';

export default function MenuScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { items } = useData();

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Bem-vindo, {user?.name}!</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{items.length}</Text>
          <Text style={styles.statLabel}>Total de Registros</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{items.filter(i => i.status === 'Ativo').length}</Text>
          <Text style={styles.statLabel}>Registros Ativos</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Opções do Sistema</Text>

        <TouchableOpacity
          style={[styles.menuItem, styles.menuItemPrimary]}
          onPress={() => router.push('/(app)/list')}
        >
          <Text style={styles.menuItemIcon}>📋</Text>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Listar Registros</Text>
            <Text style={styles.menuItemSubtitle}>Visualizar todos os dados cadastrados</Text>
          </View>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.menuItemSecondary]}
          onPress={() => router.push({ pathname: '/(app)/form', params: { mode: 'create' } })}
        >
          <Text style={styles.menuItemIcon}>➕</Text>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Cadastrar Novo</Text>
            <Text style={styles.menuItemSubtitle}>Adicionar novo registro ao sistema</Text>
          </View>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.menuItemWarning]}
          onPress={() => router.push('/(app)/list')}
        >
          <Text style={styles.menuItemIcon}>✏️</Text>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Gerenciar Dados</Text>
            <Text style={styles.menuItemSubtitle}>Editar, alterar ou deletar registros</Text>
          </View>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.menuItemDanger]}
          onPress={handleLogout}
        >
          <Text style={styles.menuItemIcon}>🚪</Text>
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Sair</Text>
            <Text style={styles.menuItemSubtitle}>Fazer logout da aplicação</Text>
          </View>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FE',
  },
  headerContainer: {
    backgroundColor: '#0A7EA4',
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A7EA4',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
  },
  menuItemPrimary: {
    borderLeftColor: '#0A7EA4',
  },
  menuItemSecondary: {
    borderLeftColor: '#4CAF50',
  },
  menuItemWarning: {
    borderLeftColor: '#FF9800',
  },
  menuItemDanger: {
    borderLeftColor: '#f44336',
  },
  menuItemIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 10,
  },
});
