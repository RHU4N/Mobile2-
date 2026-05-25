import React, { useEffect, useState } from "react";
import { View, Text, TextInput, SafeAreaView, Pressable } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles.js";

export default function VeiculoForm({ navigation }) {
	const [placa, setPlaca] = useState("");
	const [ano, setAno] = useState("");
	const [mensalidade, setMensalidade] = useState("");
	const [fkProprietario, setFkProprietario] = useState("");
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

	const handleClick = async () => {
		try {
			await axios.post("http://localhost:8081/veiculo", {
				placa,
				ano: Number(ano),
				mensalidade: Number(mensalidade),
				fk_proprietario: Number(fkProprietario),
			});
			navigation.goBack();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ alignItems: "center" }}>
				<Text style={styles.text}>Digite a placa do veículo</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite a placa"
					value={placa}
					onChangeText={setPlaca}
				/>
				<Text style={styles.text}>Digite o ano do veículo</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o ano"
					keyboardType="numeric"
					value={ano}
					onChangeText={setAno}
				/>
				<Text style={styles.text}>Digite a mensalidade</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite a mensalidade"
					keyboardType="numeric"
					value={mensalidade}
					onChangeText={setMensalidade}
				/>
				<Text style={styles.text}>Selecione o proprietário</Text>
				<View style={styles.pickerContainer}>
					<Picker
						style={styles.picker}
						selectedValue={fkProprietario}
						onValueChange={(itemValue) => setFkProprietario(itemValue)}
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
			</View>
			<View style={styles.areaBtn}>
				<Pressable
					style={[styles.botao, { backgroundColor: "#1d75cd" }]}
					onPress={handleClick}
				>
					<Text style={styles.botaoText}>Cadastrar</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
