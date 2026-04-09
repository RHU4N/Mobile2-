import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
export default function MapaFatecCotia() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.602925, // Latitude da Fatec de Cotia
          longitude: -46.919383, // Longitude da Fatec de Cotia
          latitudeDelta: 0.01, // Zoom no eixo latitude
          longitudeDelta: 0.01, // Zoom no eixo longitude
        }}
      >
        <Marker
          coordinate={{
            latitude: -23.602925,
            longitude: -46.919383,
          }}
          title="Fatec de Cotia"
          description="Faculdade de Tecnologia de Cotia"
        />
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
