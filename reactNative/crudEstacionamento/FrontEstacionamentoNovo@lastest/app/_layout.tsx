import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

function HeaderAdd({ href }: { href: '/proprietario/form' | '/veiculo/form' }) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(href)} style={{ paddingHorizontal: 12 }}>
      <MaterialIcons name="add" size={26} color="#fff" />
    </Pressable>
  );
}

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Menu de Opções' }} />
      <Stack.Screen
        name="proprietario"
        options={{ title: 'Lista de Proprietários', headerRight: () => <HeaderAdd href="/proprietario/form" /> }}
      />
      <Stack.Screen name="proprietario/form" options={{ title: 'Formulário de Proprietários' }} />
      <Stack.Screen name="proprietario/edit" options={{ title: 'Formulário de Edição' }} />
      <Stack.Screen
        name="veiculo"
        options={{ title: 'Lista de Veículos', headerRight: () => <HeaderAdd href="/veiculo/form" /> }}
      />
      <Stack.Screen name="veiculo/form" options={{ title: 'Formulário de Veículos' }} />
      <Stack.Screen name="veiculo/edit" options={{ title: 'Formulário de Edição' }} />
    </Stack>
  );
}
