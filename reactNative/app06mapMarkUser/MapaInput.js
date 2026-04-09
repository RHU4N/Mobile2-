import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
const NavegacaoPorCoordenadas = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [region, setRegion] = useState({
    latitude: -23.592031,
    longitude: -46.857944,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const navegarParaCoordenadas = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (lat < -23.8 || lat > -23.4 || lon < -47.0 || lon > -46.7) {
      Alert.alert("Erro", "As coordenadas estão fora de Cotia!");
    } else {
      setRegion({
        ...region,
        latitude: lat,
        longitude: lon,
      });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        keyboardType="numeric"
        value={latitude}
        onChangeText={setLatitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        keyboardType="numeric"
        value={longitude}
        onChangeText={setLongitude}
      />
      <Button title="Navegar" onPress={navegarParaCoordenadas} />
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
  map: { flex: 1, marginTop: 10 },
});
export default NavegacaoPorCoordenadas;
