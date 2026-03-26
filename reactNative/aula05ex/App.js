import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import TabsNavigator from "./components/navigation/TabsNavigator";
import FormStackNavigator from "./components/navigation/FormStackNavigator";
import SobreScreen from "./components/screens/SobreScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Drawer.Navigator
        initialRouteName="Inicio"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: "#1276E8" },
          headerTintColor: "#FFFFFF",
          drawerActiveTintColor: "#1276E8",
          drawerInactiveTintColor: "#526A82",
          drawerLabelStyle: { fontWeight: "600" },
          drawerIcon: ({ color, size }) => {
            const iconMap = {
              Inicio: "home",
              "Fluxo Formulario": "create",
              Sobre: "information-circle",
            };
            return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen
          name="Inicio"
          component={TabsNavigator}
          options={{ title: "Inicio" }}
        />
        <Drawer.Screen
          name="Fluxo Formulario"
          component={FormStackNavigator}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Sobre" component={SobreScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
