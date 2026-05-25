import { View, Text, SafeAreaView, FlatList, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles.js";

export default function VeiculoList({ navigation }) {
  const [veiculos, setVeiculos] = useState([]);

  const fetchAllVeiculos = async () => {
    try {
      const res = await axios.get("http://localhost:8081/veiculo");
      setVeiculos(res.data);
      Keyboard.dismiss();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/veiculo/${id}`);
      fetchAllVeiculos();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchAllVeiculos);

    fetchAllVeiculos();

    return unsubscribe;
  }, []);

  function getActions(data) {
    return (
      <>
        <Button
          onPress={() => navigation.navigate("VeiculoEdit", data)}
          type="clear"
          icon={<MaterialIcons name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => handleDelete(data.id_veiculo)}
          type="clear"
          icon={<MaterialIcons name="delete" size={25} color="red" />}
        />
      </>
    );
  }

  function Listagem({ data }) {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{data.placa}</ListItem.Title>
          <ListItem.Subtitle>Ano: {data.ano}</ListItem.Subtitle>
          <ListItem.Subtitle>Mensalidade: {data.mensalidade}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Proprietário: {data.fk_proprietario}
          </ListItem.Subtitle>
        </ListItem.Content>
        {getActions(data)}
      </ListItem>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Listando os Veículos</Text>
      </View>
      <FlatList
        keyExtractor={(item) => String(item.id_veiculo)}
        data={veiculos}
        renderItem={({ item }) => <Listagem data={item} />}
      />
    </SafeAreaView>
  );
}
