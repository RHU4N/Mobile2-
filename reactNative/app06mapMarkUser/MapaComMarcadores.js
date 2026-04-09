import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
const markers = [
  {
    title: "Marcador 1",
    description: "Descrição do Marcador 1",
    coordinate: { latitude: -23.5505, longitude: -46.6333 },
  },
  {
    title: "Marcador 2",
    description: "Descrição do Marcador 2",
    coordinate: { latitude: -23.5605, longitude: -46.6433 },
  },
  {
    title: "Marcador 3",
    description: "Descrição do Marcador 3",
    coordinate: { latitude: -23.5405, longitude: -46.6233 },
  },
];
export default function MapaComMarcadores() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.5505, // Centro aproximado dos marcadores
          longitude: -46.6333,
          latitudeDelta: 0.05, // Zoom no eixo latitude
          longitudeDelta: 0.05, // Zoom no eixo longitude
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
