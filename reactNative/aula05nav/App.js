// stack
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "./components/Home";
// import DetailsScreen from "./components/Detalhes";
// import ContatoScreen from "./components/Contato";
// import PerfilScreen from "./components/Perfil";
// const PilhaNavegacao = createNativeStackNavigator();
// export default function App() {
//   return (
//     <NavigationContainer>
//       <PilhaNavegacao.Navigator initialRouteName="Inicio">
//         <PilhaNavegacao.Screen name="Inicio" component={HomeScreen} />
//         <PilhaNavegacao.Screen name="Detalhes" component={DetailsScreen} />
//         <PilhaNavegacao.Screen name="Contato" component={ContatoScreen} />
//         <PilhaNavegacao.Screen name="Perfil" component={PerfilScreen} />
//       </PilhaNavegacao.Navigator>
//     </NavigationContainer>
//   );
// }

//botton tab
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "./components/Home";
// import DetailsScreen from "./components/Detalhes";
// import ContatoScreen from "./components/Contato";
// import PerfilScreen from "./components/Perfil";
// const Tab = createBottomTabNavigator();
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator initialRouteName="Inicio">
//         <Tab.Screen name="Inicio" component={HomeScreen} />
//         <Tab.Screen name="Detalhes" component={DetailsScreen} />
//         <Tab.Screen name="Contato" component={ContatoScreen} />
//         <Tab.Screen name="Perfil" component={PerfilScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

//drawer
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./components/Home";
import DetailsScreen from "./components/Detalhes";
import ContatoScreen from "./components/Contato";
import PerfilScreen from "./components/Perfil";
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Detalhes" component={DetailsScreen} />
        <Drawer.Screen name="Contato" component={ContatoScreen} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

