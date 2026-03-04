import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "column",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    marginBottom: 15,
  },
  noTaskText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 30,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 8,
    marginTop: 15,
    marginBottom: 5,
  },
  resultItem: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
  resultText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  forceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#3F51B5",
  },
  clearButton: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 4,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});

export default styles;
