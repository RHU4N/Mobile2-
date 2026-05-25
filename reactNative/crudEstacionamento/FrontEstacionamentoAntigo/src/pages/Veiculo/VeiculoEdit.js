import React, { useEffect, useState } from "react";
import { View, Text, TextInput, SafeAreaView, Pressable } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles.js";
export default ({ route, navigation }) => {
  // Variável que recebe os dados da Lista e preeche os campos do form
  const [veiculos, setVeiculos] = useState(route.params ? route.params : {});
  const [proprietarios, setProprietarios] = useState([]);

  const fetchProprietarios = async () => {
    try {
      const res = await axios.get("http://localhost:8081/proprietario");
      setProprietarios(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProprietarios();
  }, []);
  //Função que Altera os dados utilizando a API
  const handleClick = async () => {
    try {
      await axios.put(
        `http://localhost:8081/veiculo/${veiculos.id_veiculo}`,
        {
          placa: veiculos.placa,
          ano: Number(veiculos.ano),
          mensalidade: Number(veiculos.mensalidade),
          fk_proprietario: Number(veiculos.fk_proprietario),
        },
      );
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Identificação</Text>
        <TextInput
          editable={false}
          style={styles.input}
          onChangeText={(id_veiculo) =>
            setVeiculos({
              ...veiculos,
              id_veiculo,
            })
          }
          value={String(veiculos.id_veiculo ?? "")}
        />
        <Text style={styles.text}>Digite a placa do veículo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a placa"
          onChangeText={(nome) =>
            setVeiculos({
              ...veiculos,
              placa: nome,
            })
          }
          value={veiculos.placa ?? ""}
        />
        <Text style={styles.text}>Digite o ano do veículo</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o ano"
          onChangeText={(ano) =>
            setVeiculos({
              ...veiculos,
              ano,
            })
          }
          value={String(veiculos.ano ?? "")}
        />
        <Text style={styles.text}>Digite a mensalidade</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite a mensalidade"
          onChangeText={(mensalidade) =>
            setVeiculos({
              ...veiculos,
              mensalidade,
            })
          }
          value={String(veiculos.mensalidade ?? "")}
        />
        <Text style={styles.text}>Selecione o proprietário</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={String(veiculos.fk_proprietario ?? "")}
            onValueChange={(itemValue) =>
              setVeiculos({
                ...veiculos,
                fk_proprietario: itemValue,
              })
            }
          >
            <Picker.Item label="Selecione um proprietário" value="" />
            {proprietarios.map((item) => (
              <Picker.Item
                key={item.id_proprietario}
                label={`${item.nome} - ${item.cpf}`}
                value={String(item.id_proprietario)}
              />
            ))}
          </Picker>
        </View>
        <Pressable
          style={[styles.botao, { backgroundColor: "#1d75cd" }]}
          onPress={handleClick}
        >
          <Text style={styles.botaoText}>Alterar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
