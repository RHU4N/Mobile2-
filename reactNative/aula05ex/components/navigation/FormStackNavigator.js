import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormularioScreen from "../forms/FormularioScreen";
import ConfirmacaoScreen from "../forms/ConfirmacaoScreen";

const Stack = createNativeStackNavigator();

export default function FormStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1276E8" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen name="Formulario" component={FormularioScreen} />
      <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
    </Stack.Navigator>
  );
}
