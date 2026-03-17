// CheckBox - React Native Elements
// import React, { useState } from "react";
// import { View, StyleSheet, Alert } from "react-native";
// import { CheckBox, Button, Text } from "react-native-elements";

// export default function App() {
//   const [aceitaTermos, setAceitaTermos] = useState(false);
//   const [receberEmail, setReceberEmail] = useState(false);

//   const mostrarSelecionados = () => {
//     let selecionados = [];
//     if (aceitaTermos) selecionados.push("Aceita os termos");
//     if (receberEmail) selecionados.push("Deseja receber email");

//     if (selecionados.length === 0) {
//       alert("Nenhuma opção selecionada");
//     } else {
//       alert("Opções selecionadas: \n" + selecionados.join("\n"));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text h4 style={styles.titulo}>
//         Preferências
//       </Text>

//       <CheckBox
//         title="Aceita os termos"
//         checked={aceitaTermos}
//         onPress={() => setAceitaTermos(!aceitaTermos)}
//       />

//       <CheckBox
//         title="Deseja receber email"
//         checked={receberEmail}
//         onPress={() => setReceberEmail(!receberEmail)}
//       />

//       <Button
//         title="Mostrar Selecionados"
//         onPress={mostrarSelecionados}
//         containerStyle={styles.botao}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   titulo: {
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   botao: {
//     marginTop: 30,
//   },
// });

// Picker - React Native

// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';

// export default function App() {
//   const [valor1, setValor1] = useState('');
//   const [valor2, setValor2] = useState('');
//   const [open, setOpen] = useState(false);
//   const [operacao, setOperacao] = useState(null);
//   const [items, setItems] = useState([
//     { label: '+', value: '+' },
//     { label: '-', value: '-' },
//     { label: '*', value: '*' },
//     { label: '/', value: '/' },
//   ]);
//   const [resultado, setResultado] = useState('');

//   const calcular = () => {
//     const v1 = parseFloat(valor1);
//     const v2 = parseFloat(valor2);
//     let res = 0;

//     if (operacao === '+') res = v1 + v2;
//     else if (operacao === '-') res = v1 - v2;
//     else if (operacao === '*') res = v1 * v2;
//     else if (operacao === '/') res = v1 / v2;

//     setResultado(`Resultado: ${res}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titulo}>Calculadora</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Digite o primeiro número"
//         keyboardType="numeric"
//         onChangeText={setValor1}
//         value={valor1}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Digite o segundo número"
//         keyboardType="numeric"
//         onChangeText={setValor2}
//         value={valor2}
//       />
//       <DropDownPicker
//         open={open}
//         value={operacao}
//         items={items}
//         setOpen={setOpen}
//         setValue={setOperacao}
//         setItems={setItems}
//         placeholder="Escolha a operação"
//         containerStyle={{ marginBottom: 10 }}
//       />
//       <Button title="Calcular" onPress={calcular} />
//       <Text style={styles.resultado}>{resultado}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   titulo: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     borderRadius: 5,
//     boerderWidth: 1,
//     borderColor: '#aaa',
//     padding: 10,
//     marginBottom: 10,
//   },
//   resultado: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
// });

// RadioButton - React Native Elements
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton, Button } from "react-native-paper";

export default function App() {
  const [resposta, setResposta] = useState(""); // Estado para a resposta selecionada;
  const [mensagem, setMensagem] = useState(""); // Estado para a mensagem de  feedback;

  const verificarResposta = () => {
    if (!resposta) {
      setMensagem("Selecione uma opção antes de verificar!");
    } else if (resposta === "correta") {
      setMensagem("Parabéns! Você acertou a resposta!");
    } else {
      setMensagem("Que pena! Resposta errada. Tente novamente!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pergunta}>Quem descobriu o Brasil?</Text>
      <RadioButton.Group
        onValueChange={(value) => setResposta(value)}
        value={resposta}
      >
        <View style={styles.radio}>
          <RadioButton value="correta" />
          <Text>Pedro Álvares Cabral</Text>
        </View>
        <View style={styles.radio}>
          <RadioButton value="errada1" />
          <Text>Cristóvão Colombo</Text>
        </View>
        <View style={styles.radio}>
          <RadioButton value="errada2" />
          <Text>Dom João VI</Text>
        </View>
        <View style={styles.radio}>
          <RadioButton value="errada3" />
          <Text>Vasco da Gama</Text>
        </View>
      </RadioButton.Group>
      <Button mode="contained" onPress={verificarResposta} style={styles.botao}>
        Verificar Resposta
      </Button>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  pergunta: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  botao: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
  },
  mensagem: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
});
