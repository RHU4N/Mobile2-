import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapaFatecCotia from "./MapaFatecCotia"; // Mapa da Fatec Cotia
import MapaComMarcadores from "./MapaComMarcadores"; // Mapa com múltiplos marcadores;
import MapaInput from "./MapaInput"; // Mapa com entrada de latitude / longitude;
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Mapa Fatec Cotia" component={MapaFatecCotia} />
        <Drawer.Screen
          name="Mapa com Marcadores"
          component={MapaComMarcadores}
        />
        <Drawer.Screen name="Mapa Customizado" component={MapaInput} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
