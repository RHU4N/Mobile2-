import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import CrudScreen from "./components/CrudScreen";
import AlteracaoScreen from "./components/AlteracaoScreen";
import CadastroScreen from "./components/CadastroScreen";
import ListagemScreen from "./components/ListagemScreen";
import LoginScreen from "./components/LoginScreen";
import { observarAutenticacao } from "./services/authService";
import styles from "./styles";

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregandoAuth, setCarregandoAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = observarAutenticacao((user) => {
      setUsuario(user);
      setCarregandoAuth(false);
    });
    return unsubscribe;
  }, []);

  if (carregandoAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!usuario ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} styles={styles} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <CrudScreen {...props} usuario={usuario} styles={styles} />}
            </Stack.Screen>
            <Stack.Screen name="Cadastro">
              {(props) => <CadastroScreen {...props} styles={styles} />}
            </Stack.Screen>
            <Stack.Screen name="Alteracao">
              {(props) => <AlteracaoScreen {...props} styles={styles} />}
            </Stack.Screen>
            <Stack.Screen name="Listagem">
              {(props) => <ListagemScreen {...props} styles={styles} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
