import { Stack } from 'expo-router';
import { useAuth } from '@/app/context/authContext';

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0A7EA4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: `Menu - ${user?.name}`,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="list"
        options={{
          title: 'Listar Dados',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          title: 'Cadastro/Edição',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
