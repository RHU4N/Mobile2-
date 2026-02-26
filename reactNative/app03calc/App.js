import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 
'react-native'; 
 
export default function App() { 
  const [num1, setNum1] = useState(''); 
  const [num2, setNum2] = useState(''); 
  const [resultado, setResultado] = useState(''); 
 
  const handleSuma = () => { 
    const sum = parseFloat(num1) + parseFloat(num2); 
    setResultado(`Soma: ${sum}`); 
  }; 
 
  const handleSubtracao = () => { 
    const subtraction = parseFloat(num1) - parseFloat(num2); 
    setResultado(`Subtração: ${subtraction}`); 
  }; 
 
  const handleMultiplicacao = () => { 
    const subtraction = parseFloat(num1) * parseFloat(num2); 
    setResultado(`Multiplicação: ${subtraction}`); 
  }; 
 
  const handleDivisao = () => { 
    const subtraction = parseFloat(num1) / parseFloat(num2); 
    setResultado(`Divisão: ${subtraction}`); 
  }; 
 
  return ( 
    <View style={styles.container}> 
      <Image source={{ uri: 'https://placehold.co/150' }} 
style={styles.image} /> 
      <Text style={styles.title}>Calculadora</Text> 
      <TextInput 
        style={styles.input} 
        placeholder="Digite o 1º número" 
        keyboardType="numeric" 
        value={num1} 
        onChangeText={(text) => setNum1(text)} 
      /> 
      <TextInput 
        style={styles.input} 
        placeholder="Digite o 2º número" 
  keyboardType="numeric" 
        value={num2} 
        onChangeText={(text) => setNum2(text)} 
      />     
      
      <View style={styles.buttonContainer}> 
        <TouchableOpacity style={styles.button} onPress={handleSuma}> 
          <Text style={styles.buttonText}>Somar</Text> 
        </TouchableOpacity> 
 
        <TouchableOpacity style={styles.button} onPress={handleSubtracao}> 
          <Text style={styles.buttonText}>Subtrair</Text> 
        </TouchableOpacity> 
 
        <TouchableOpacity style={styles.button} 
onPress={handleMultiplicacao}> 
          <Text style={styles.buttonText}>Multiplicar</Text> 
        </TouchableOpacity> 
 
        <TouchableOpacity style={styles.button} onPress={handleDivisao}> 
          <Text style={styles.buttonText}>Dividir</Text> 
        </TouchableOpacity> 
      </View> 
 
      <Text style={styles.result}>{resultado}</Text> 
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5', 
    padding: 20, 
  }, 
  image: { 
    width: 100, 
    height: 100, 
    marginBottom: 20, 
  }, 
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 20, 
  }, 
  input: { 
    width: '80%', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginVertical: 10, 
    borderRadius: 5, 
    backgroundColor: '#fff', 
  }, 
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20, 
    width: '80%', 
  }, 
  button: { 
    backgroundColor: '#4CAF50', 
    padding: 10, 
    borderRadius: 5, 
    marginHorizontal: 5, 
  }, 
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    textAlign: 'center', 
  }, 
  result: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
  }, 
}); 