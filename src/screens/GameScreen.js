import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// DEFINICION DE LAS DIMENSIONES DE LA PANTALLA Y TAMAÑO DE LOS OBJETOS DEL JUEGO
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const PADDLE_WIDTH = 150;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 75;
const BALL_SPEED = 5;
const BASE_SPEED = 5;

// ACA SE DEFINE Y EXPORTA EL COMPONENTE PRINCIPAL DE LA PANTALLA DEL JUEGO
export default function GameScreen({ route }) {
 const { mode } = route.params || { mode: "tenis" };

  const navigation = useNavigation();

  // ESTOS 2 SWITCH SE ENCARGAN DE CAMBIAR LA CANCHA Y PELOTA SEGUN LO SELECCIONADO
  const getBackgroundImage = () => {
    switch (mode) {
      case "futbol":
        return require("../../assets/canchaFutbol.png");
      case "basquet":
        return require("../../assets/canchaBasquet.png");
      default:
        return require("../../assets/canchaTennis.png");
    }
  };

  const getBallImage = () => {
    switch (mode) {
      case "futbol":
        return require("../../assets/futbolBall.png");
      case "basquet":
        return require("../../assets/basquetBall.png");
      default:
        return require("../../assets/tenisBall.png");
    }
  };

  // ESTO SE USA PARA MOVER LA PALETA Y CENTRARLA A MITAD DEL DEDO
  const [paddleX, setPaddleX] = useState((SCREEN_WIDTH - PADDLE_WIDTH) / 2);

  const [ballSize, setBallSize] = useState(BALL_SIZE);

  // ACA SE DEFINE POSICION Y DIRECCION DE LA PELOTA (x, y, son posicion y dx y dy son direccion)
  const [ball, setBall] = useState({
    x: SCREEN_WIDTH / 2 - BALL_SIZE / 2,
    y: SCREEN_HEIGHT / 2,
    dx: BALL_SPEED,
    dy: -BALL_SPEED,
  });

  // CONTADOR DE PUNTOS Y ACTUALIZADOR DE PUNTOS
  const [score, setScore] = useState(0);

  // CUANDO LA PELOTA TOCA EL FONDO gameOver PARA A true
  const [gameOver, setGameOver] = useState(false);

  // GUARDA LA ULTIMA POSICION DE LA PELOTA
  const ballRef = useRef(ball);

  // GUARDA LA ULTIMA POSICION DE LA PALETA
  const paddleRef = useRef(paddleX);

  // SE ACTUALIZA EL ESTADO DE LA PELOTA PARA OTRAS PARTES DEL JUEGO PUEDAN SABER SU POSICION
  useEffect(() => {
    ballRef.current = ball;
  }, [ball]);

  // SE ACTUALIZA EL ESTADO DE LA PALETA PARA OTRAS PARTES DEL JUEGO PUEDAN SABER SU POSICION
  useEffect(() => {
    paddleRef.current = paddleX;
  }, [paddleX]);

  // LOGICA DE AUMENTO DE VELOCIDAD DE LA PELOTA
  useEffect(() => {
    const speedMultiplier = 1 + Math.floor(score / 5) * 0.5; // AUMENTA 50% CADA 5 GOLPES

    setBall((prev) => {
      const newDx = (prev.dx > 0 ? 1 : -1) * BASE_SPEED * speedMultiplier;
      const newDy = (prev.dy > 0 ? 1 : -1) * BASE_SPEED * speedMultiplier;

      return {
        ...prev,
        dx: newDx,
        dy: newDy,
      };
    });
  }, [score]);

  // LOGICA DE MOVIMIENTO DE LA PALETA CON EL DEDO USANDO panResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.moveX - PADDLE_WIDTH / 2; //INDICA POSICION HORIZONTAL DEL DEDO
        newX = Math.max(0, Math.min(SCREEN_WIDTH - PADDLE_WIDTH, newX)); // LIMITES DENTRO DE LA PANTALLA
        setPaddleX(newX); // MUEVE PALETA SEGUN EL DEDO
      },
    })
  ).current;

  // SE EJECUTA AL COMENZAR EL JUEGO O AL PERDER
  useEffect(() => {
  if (gameOver) return;

  let animationFrameId;

  const updateBallPosition = () => {
    setBall((prev) => {
      let newX = prev.x + prev.dx;
      let newY = prev.y + prev.dy;
      let newDx = prev.dx;
      let newDy = prev.dy;

      // Rebote contra las paredes
      if (newX <= 0 || newX + ballSize >= SCREEN_WIDTH) {
        newDx = -newDx;
      }

      if (newY <= 0) {
        newDy = -newDy;
      }

      // Colisión con paleta
      const PADDLE_BOTTOM_OFFSET = 150;
      const paddleTop = SCREEN_HEIGHT - PADDLE_HEIGHT - PADDLE_BOTTOM_OFFSET;
      const isBallCollidingVertically =
        newY + ballSize >= paddleTop &&
        newY + ballSize <= paddleTop + PADDLE_HEIGHT;
      const isBallWithinPaddle =
        newX + ballSize >= paddleRef.current &&
        newX <= paddleRef.current + PADDLE_WIDTH;

      if (isBallCollidingVertically && isBallWithinPaddle && newDy > 0) {
        newDy = -newDy;

        setScore((s) => {
          const newScore = s + 1;
          return newScore;
        });
      }

      // Pérdida
      if (newY + ballSize >= SCREEN_HEIGHT) {
        setGameOver(true);
      }

      return {
        ...prev,
        x: newX,
        y: newY,
        dx: newDx,
        dy: newDy,
      };
    });

    animationFrameId = requestAnimationFrame(updateBallPosition);
  };

  animationFrameId = requestAnimationFrame(updateBallPosition);

  return () => cancelAnimationFrame(animationFrameId);
}, [gameOver]);

  const resetGame = () => {
    setBall({
      x: SCREEN_WIDTH / 2 - BALL_SIZE / 2,
      y: SCREEN_HEIGHT / 2,
      dx: BALL_SPEED,
      dy: -BALL_SPEED,
    });
    setPaddleX((SCREEN_WIDTH - PADDLE_WIDTH) / 2);
    setScore(0);
    setGameOver(false);
    setBallSize(BALL_SIZE);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="grey">
      <ImageBackground
        source={getBackgroundImage()}
        style={styles.container}
        resizeMode="stretch"
        {...panResponder.panHandlers}
      >
        <Text style={styles.score}>{score}</Text>
        {gameOver && (
  <>
    <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
      <Text style={styles.restartText}>Reiniciar</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.restartButton, { backgroundColor: "#2196F3", marginTop: 10 }]}
      onPress={() => navigation.navigate("Inicio")}
    >
      <Text style={styles.restartText}>Volver al Inicio</Text>
    </TouchableOpacity>
  </>
)}

        <Image
          source={getBallImage()}
          style={{
            width: ballSize,
            height: ballSize,
            position: "absolute",
            left: ball.x,
            top: ball.y,
          }}
        />

        <Image
          source={require("../../assets/paddle.png")}
           style={{
            position: "absolute",
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            bottom: 75,
            left: paddleX,
          }}
        />

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    
  },
  score: {
    color: "black",
    fontSize: 100,
    textAlign: "center",
    marginTop: 250,
    opacity: 0.4,
  },
  gameOver: {
    color: "red",
    fontSize: 32,
    textAlign: "center",
    marginTop: 20,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  restartButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 20,
  },

  restartText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
