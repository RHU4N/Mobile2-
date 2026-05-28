import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Estacionamento</Text>
        <Text style={styles.subtitle}>Gerencie proprietários e veículos de forma simples.</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={() => router.push('/proprietario')}>
          <Text style={styles.buttonText}>Proprietários</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/veiculo')}>
          <Text style={styles.buttonText}>Veículos</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f4f8fb',
    justifyContent: 'center',
  },
  hero: {
    gap: 12,
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 22,
  },
  actions: {
    gap: 14,
  },
  button: {
    backgroundColor: '#1d75cd',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
