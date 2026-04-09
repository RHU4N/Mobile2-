import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapa com 2 marcadores</Text>
        <Text style={styles.subtitle}>
          Casa e Fatec Cotia com imagens diferentes
        </Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.618020855809384,
          longitude: -46.89099444750039,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        <Marker
          coordinate={{
            latitude: -23.638226234423307,
            longitude: -46.85508146191765,
          }}
          title="Casa"
          description="Casa"
          image={require("./assets/icon.png")}
        />

        <Marker
          coordinate={{
            latitude: -23.59781547719547,
            longitude: -46.92690743308313,
          }}
          title="Fatec Cotia"
          description="Fatec Cotia"
          image={require("./assets/adaptive-icon.png")}
        />
      </MapView>

      <View style={styles.footer}>
        <View style={styles.legendItem}>
          <Image source={require("./assets/icon.png")} style={styles.legendIcon} />
          <Text style={styles.legendText}>Casa</Text>
        </View>
        <View style={styles.legendItem}>
          <Image
            source={require("./assets/adaptive-icon.png")}
            style={styles.legendIcon}
          />
          <Text style={styles.legendText}>Fatec Cotia</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#0f172a",
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#cbd5e1",
    marginTop: 6,
    fontSize: 14,
  },
  map: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
    borderRadius: 6,
  },
  legendText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "600",
  },
});
