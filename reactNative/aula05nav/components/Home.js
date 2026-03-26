import React from "react";
import { View, Text } from "react-native";
import { Button } from "@react-navigation/elements";
export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Bem-vindo à Tela Inicial</Text>
      <Button onPress={() => navigation.navigate("Inicio")}>
        {" "}
        Ir para Início
      </Button>
      <Button onPress={() => navigation.navigate("Detalhes")}>
        {" "}
        Ir para Detalhes{" "}
      </Button>
      <Button onPress={() => navigation.navigate("Contato")}>
        {" "}
        Ir para Contato{" "}
      </Button>
      <Button onPress={() => navigation.navigate("Perfil")}>
        {" "}
        Ir para Perfil
      </Button>
    </View>
  );
}
