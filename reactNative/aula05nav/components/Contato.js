import React from 'react'; 
import { View, Text } from 'react-native'; 
import { Button } from '@react-navigation/elements'; 
 
export default function ContatoScreen({ navigation }) { 
  return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' 
}}> 
      <Text>Bem-vindo à Tela de Contato</Text> 
      <Button title="Ir para Início" onPress={() => 
navigation.navigate('Inicio')}> 
        Voltar para o Ínicio 
      </Button> 
    </View> 
  ); 
} 