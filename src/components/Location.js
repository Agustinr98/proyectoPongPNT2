import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location"; // MODULO DE EXPO PARA ACCEDER A UBICACION DEL DISPOSITIVO

export default function Ubicacion() {
  const [errorMsg, setErrorMsg] = useState(null); // GUARDA MENSAJE DE ERROR
  const [ubicacionInfo, setUbicacionInfo] = useState(null); // GUARDA DATOS EN FORMATO TEXTO DE PROVINCIA Y PAIS

  useEffect(() => {
    async function getCurrentLocation() {
      // SOLICITUD DE PERMISOS
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso denegado");
        return;
      }

      // OBTENCION DE COORDENADAS
      let location = await Location.getCurrentPositionAsync({});

      // ACA MUESTRA PROVINCIA Y PAIS SEGUN LAS COORDENADAS
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode.length > 0) {
        let info = geocode[0];
        setUbicacionInfo(info);
      }
    }

    getCurrentLocation();
  }, []);

  let text = "Buscando ubicación...";
  if (errorMsg) {
    text = errorMsg;
  } else if (ubicacionInfo) {
    text = `Usted se encuentra en ${ubicacionInfo.region ?? "-"}, ${
      ubicacionInfo.country ?? "-"
    }`;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textoUb}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    minHeight: 50,
    maxHeight: 80,
  },
  textoUb: {
    fontSize: 16,
    textAlign: "center",
    color: "#3578E5",
  },
});
