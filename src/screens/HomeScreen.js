import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../Hooks/useAuth";
import Location from "../components/Location.js";

export default function HomeScreen({ navigation }) {
  const [highScore, setHighScore] = useState(0);
  const { logout, auth } = useAuth();

  //CADA TARJETA LLEVA A SU RESPECTIVA CANCHA Y PELOTA
  const cards = [
    {
      image: require("../../assets/canchaBasquet.png"),
      label: "Basquet Pong",
      mode: "basquet",
    },
    {
      image: require("../../assets/canchaFutbol.png"),
      label: "Fútbol Pong",
      mode: "futbol",
    },
    {
      image: require("../../assets/canchaTennis.png"),
      label: "Tennis Pong",
      mode: "tenis",
    },
  ];

  //SE CARGA EL PUNTAJE MAS ALTO DEL USUARIO LOGUEADO DESDE EL ASYNCSTORAGE
  const loadHighScore = async () => {
    if (!auth?.username) return;

    try {
      const key = `highScore_${auth.username}`;
      const score = await AsyncStorage.getItem(key);
      if (score !== null) {
        setHighScore(parseInt(score));
      } else {
        setHighScore(0);
      }
    } catch (e) {}
  };

  useEffect(() => {
    //CARGA EL PUNTAJE AL INICIAR EL JUEGO Y AL SALIR DEL JUEGO EN SI
    loadHighScore();
  }, [auth]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadHighScore();
    });

    return unsubscribe;
  }, [navigation, auth]);

  //ACA SE PASA EL MODO DE JUEGO ELEGIDO SEGUN LA TARJETA DE ARRIBA
  const goToGame = (mode) => {
    navigation.navigate("Game", { mode });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.title, { marginBottom: 50 }]}>PONG</Text>
        <Text style={[styles.scoreTitle]}>Puntaje más alto 🏆 {highScore}</Text>

        <View style={styles.cardContainer}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => goToGame(card.mode)}
            >
              <Image
                source={card.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.cardLabel}>{card.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ranking */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("LeaderBoard")}
        >
          <Text style={styles.secondaryText}>Ranking</Text>
        </TouchableOpacity>

        {/* Cerrar sesión */}
        <TouchableOpacity
          style={[styles.secondaryButton, { marginBottom: 20 }]}
          onPress={logout}
        >
          <Text style={styles.secondaryText}>Cerrar sesión</Text>
        </TouchableOpacity>

        {/* Editar usuario */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("EditarUsuario")}
        >
          <Text style={styles.secondaryText}>Editar/Eliminar Usuario</Text>
        </TouchableOpacity>
        <View>
          <Location />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FB" },
  scroll: { alignItems: "center", paddingVertical: 30 },
  title: { fontSize: 40, fontWeight: "bold", color: "#1A2A3A", marginTop: 30 },
  scoreTitle: {
    fontSize: 30,
    color: "#1A2A3A",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 50,
  },
  score: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1A2A3A",
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
    flexWrap: "wrap",
  },
  card: {
    width: 110,
    height: 140,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 100,
  },
  cardLabel: {
    marginTop: 5,
    fontSize: 14,
    color: "#1A2A3A",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#3578E5",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  secondaryButton: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderColor: "#3578E5",
    borderWidth: 2,
    marginBottom: 15,
    alignSelf: "center",
  },
  secondaryText: {
    color: "#3578E5",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
