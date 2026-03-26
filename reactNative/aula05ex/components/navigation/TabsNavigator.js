import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import AulasScreen from "../screens/AulasScreen";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0E74E5",
        tabBarInactiveTintColor: "#8AA0B8",
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#D7E1EC",
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Inicio: "home",
            Aulas: "book",
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Aulas" component={AulasScreen} />
    </Tab.Navigator>
  );
}
