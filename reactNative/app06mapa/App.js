import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapaFatecCotia from "./MapaFatecCotia"; // Importa o componente do mapa

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Mapa Fatec Cotia" component={MapaFatecCotia} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
