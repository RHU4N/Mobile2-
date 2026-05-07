import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Picker,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useData } from '@/app/context/dataContext';

export default function FormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addItem, updateItem, getItem } = useData();
  
  const isEditMode = params.mode === 'edit';
  const itemId = params.id as string;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Ativo',
  });

  useEffect(() => {
    if (isEditMode && itemId) {
      const item = getItem(itemId);
      if (item) {
        setFormData({
          name: item.name,
          email: item.email,
          phone: item.phone,
          status: item.status,
        });
      }
    }
  }, [isEditMode, itemId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Erro', 'O email é obrigatório');
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Erro', 'Email inválido');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Erro', 'O telefone é obrigatório');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    if (isEditMode && itemId) {
      updateItem(itemId, formData);
      Alert.alert('Sucesso', 'Registro atualizado com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      addItem(formData);
      Alert.alert('Sucesso', 'Registro criado com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {isEditMode ? 'Editar Registro' : 'Novo Registro'}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome completo"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            style={styles.input}
            placeholder="(11) 9XXXX-XXXX"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
              style={styles.picker}
            >
              <Picker.Item label="Ativo" value="Ativo" />
              <Picker.Item label="Inativo" value="Inativo" />
            </Picker>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>
              {isEditMode ? '💾 Atualizar' : '➕ Criar Registro'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonCancel]}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>❌ Cancelar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Informações:</Text>
          <Text style={styles.infoText}>* Campos obrigatórios</Text>
          <Text style={styles.infoText}>
            Todos os dados são armazenados localmente na aplicação.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FE',
  },
  formContainer: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A7EA4',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#4CAF50',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#0A7EA4',
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 11,
    color: '#666',
    marginBottom: 3,
  },
});
