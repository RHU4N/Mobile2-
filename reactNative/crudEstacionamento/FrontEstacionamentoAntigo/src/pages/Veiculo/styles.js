import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		marginTop: 25,
		marginBottom: 15,
		fontSize: 25,
		fontWeight: "bold",
	},
	input: {
		backgroundColor: "#FFF",
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 5,
		width: "90%",
		padding: 10,
		fontSize: 18,
	},
	pickerContainer: { 
		borderRadius: 5,
		width: "90%",
		height: 50,
		justifyContent: "center",
		paddingHorizontal: 10,
		marginBottom: 0,
	},
	picker: {
		width: "100%",
		height: "100%",
	},
	areaBtn: {
		alignItems: "center",
		flexDirection: "row",
		marginTop: 15,
		justifyContent: "space-around",
	},
	botao: {
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
		borderRadius: 5,
	},
	botaoText: {
		fontSize: 22,
		color: "#FFF",
	},
});

export default styles;
