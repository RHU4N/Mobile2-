import React from 'react'; 
import { View, Text, Button } from 'react-native'; 
 
export default function DetailsScreen({ navigation }) { 
  return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' 
}}> 
      <Text>Tela de Detalhes</Text> 
      <Button title="Detalhes Novamente" onPress={() => 
navigation.push('Detalhes')} /> 
      <Button title="Voltar" onPress={() => navigation.goBack()} /> 
      <Button title="Ir para Início" onPress={() => 
navigation.navigate('Inicio')} /> 
      <Button title="Voltar ao Início da Pilha" onPress={() => 
navigation.popToTop()} /> 
    </View> 
  ); 
} 