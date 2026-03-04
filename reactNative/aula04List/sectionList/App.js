import React from "react";
import {
  View,
  Text,
  SectionList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
const DATA = [
  {
    title: "Desenvolvimento Web",
    data: [
      {
        id: "1",
        title: "HTML e CSS",
        subtitle: "HTML 5 e suas novidades",
        image: "https://placehold.co/100x100",
        description: "Curso sobre HTML5 e CSS.",
      },
    ],
  },
  {
    title: "Desenvolvimento Mobile",
    data: [
      {
        id: "2",
        title: "Android",
        subtitle: "Boas práticas",
        image: "https://placehold.co/100x100",
        description: "Curso sobre desenvolvimento Android.",
      },
    ],
  },
  {
    title: "Programação",
    data: [
      {
        id: "3",
        title: "Java",
        subtitle: "Básico de Java",
        image: "https://placehold.co/100x100",
        description: "Curso introdutório de Java.",
      },
    ],
  },
];

export default function App() {
  const handlePress = (item) => {
    Alert.alert(item.title, item.description);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  sectionHeader: {
    backgroundColor: "#3F51B5",
    color: "#fff",
    fontSize: 18,
    padding: 10,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});
