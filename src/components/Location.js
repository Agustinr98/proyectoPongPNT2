import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

import * as Location from "expo-location";

export default function Ubicacion() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ubicacionInfo, setUbicacionInfo] = useState(null);

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
      //console.log("location", location);
      setLocation(location);

      // ACA MUESTRA PROVINCIA Y PAIS SEGUN LAS COORDENADAS
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode.length > 0) {
        let info = geocode[0];
        //console.log("Provincia:", info.region);
        //console.log("País:", info.country);
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textoUb: {
    fontSize: 16,
    textAlign: "center",
    color: "#3578E5"
  },
});
