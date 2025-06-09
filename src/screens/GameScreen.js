import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, PanResponder, Text, Image, ImageBackground } from "react-native";


//********************************************************************************************
// DEFINICION DE LAS DIMENSIONES DE LA PANTALLA Y TAMAÑO DE LOS OBJETOS DEL JUEGO
//********************************************************************************************
/*
    "Dimensions.get" OBTIENE EL ANCHO Y EL ALTO DE LA PANTALLA DEL CELULAR Y GUARDA
    ESOS VALORES EN LAS CONSTANTES "SCREEN_WIDTH" Y "SCREEN_HEIGHT"
*/
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/*
    "PADDLE_WIDTH" DEFINE EL ANCHO DE LA PALETA EN 100px
    "PADDLE_HEIGHT" DEFINE EL ALTO DE LA PALETA EN 20px
    "BALL_SIZE" DEFINE EL DIAMETRO DE LA PELOTA EN 20px (ES UN CUADRADO QUE LUEGO SE REDONDEA)
    "BALL_SPEED" DEFINE EL VALOR INICIAL DE VELOCIDAD (MAYOR VALOR MAS VELOCIDAD)
*/
const PADDLE_WIDTH = 500;
const PADDLE_HEIGHT = 20;
const BALL_SIZE = 125;
const BALL_SPEED = 5;
//********************************************************************************************


//********************************************************************************************
// ACA SE DEFINE Y EXPORTA EL COMPONENTE PRINCIPAL DE LA PANTALLA DEL JUEGO
//********************************************************************************************
export default function GameScreen() {
//---------------------------------------------------------------------------------------------
/*
    "const [paddleX, setPaddleX] = useState((SCREEN_WIDTH - PADDLE_WIDTH) / 2)""
    "(SCREEN_WIDTH - PADDLE_WIDTH) / 2": ESTO SETEA LA POSICION INICIAL EN HORIZONTAL
    DE LA PALETA; EL "/2" CALCULA EL CENTRO DE LA PANTALLA
    "setPaddleX": ESTO SE USA PARA MOVER LA PALETA CON EL DEDO
*/
  const [paddleX, setPaddleX] = useState((SCREEN_WIDTH - PADDLE_WIDTH) / 2);

/*
    "const [ball, setBall] = useState({ ... })": ESTE USESTATE DEFINE POSICION Y DIRECCION DE LA PELOTA
    "x: SCREEN_WIDTH / 2 - BALL_SIZE / 2": DEFINE POSICION HORIZONTAL INICIAL EN CENTRO DE LA PANTALLA
    "y: SCREEN_HEIGHT / 2": DEFINE POSICION VERTICAL EN CENTRO DE LA PANTALLA
    "dx: BALL_SPEED": DEFINE VELOCIDAD HORIZONTAL (POSITIVO ES HACIA DERECHA)
    "dy: -BALL_SPEED": DEFINE VELOCIDAD VERTICAL (NEGATIVO ES HACIA DERECHA)

    "x" Y "y" SON LAS COORDENADAS DE LA PELOTA
    "dx" Y "dy" REPRESENTAN LA DIRECCION Y VELOCIDAD DE MOVIMIENTO EN CADA EJE

*/
  const [ball, setBall] = useState({
    x: SCREEN_WIDTH / 2 - BALL_SIZE / 2,
    y: SCREEN_HEIGHT / 2,
    dx: BALL_SPEED,
    dy: -BALL_SPEED,
  });

/*
    "const [score, setScore] = useState(0)": CONTADOR DE PUNTOS, COMIENZA EN CERO
    "setScore": SE USARA PARA AUMENTAR EL VALOR CUANDO LA PELOTA TOQUE LA PALETA
*/
  const [score, setScore] = useState(0);
  

/*
    "const [gameOver, setGameOver] = useState(false)": BOOLEANO PARA SABER SI EL JUGADOR PERDIO
    CUANDO LA PELOTA TOCA EL FONDO DE LA PANTALLA; SI ES TRUE EL JUEGO SE DETIENE    
*/
  const [gameOver, setGameOver] = useState(false);

/*
    "const ballRef = useRef(ball)": SE GUARDA LA ULTIMA POSICION DE LA PELOTA
*/
  const ballRef = useRef(ball);

/*
    "const paddleRef = useRef(paddleX)": SE GUARDA LA ULTIMA POSICION DE LA PALETA
*/
  const paddleRef = useRef(paddleX);

/*
    "useEffect(() => { ... }, [ball])": SE EJECUTA CUANDO CAMBIA EL ESTADO DE LA PELOTA (ball)
    "ballRef.current = ball": ACTUALIZA EL "ref" CON EL NUEVO VALOR DEL ESTADO PELOTA (ball)

    ESTE BLOQUE ACTUALIZA EL ESTADO DE LA PELOTA PARA QUE OTRAS PARTES DEL CODIGO PUEDAN SABER
    SU ULTIMA POSICION
*/
  useEffect(() => {
    ballRef.current = ball;
  }, [ball]);

/*
    "useEffect(() => { ... }, [paddleX])": SE EJECUTA CUANDO CAMBIA EL ESTADO DE LA PALETA (paddleX)
    "paddleRef.current = paddleX": ACTUALIZA EL "ref" CON EL NUEVO VALOR DEL ESTADO PALETA (paddleX)

    ESTE BLOQUE ACTUALIZA EL ESTADO DE LA PALETA PARA QUE OTRAS PARTES DEL CODIGO PUEDAN SABER
    SU ULTIMA POSICION
*/
  useEffect(() => {
    paddleRef.current = paddleX;
  }, [paddleX]);

//********************************************************************************************
// ACA ESTA LA LOGICA PARA MOVER LA PALETA CON EL DEDO
//********************************************************************************************

/*
    "panResponder": ES UNA HERRAMIENTA DE REACT NATIVE PARA MANEJAR GESTOS TACTILES
    "PanResponder.create": CREA UNA LISTA DE GESTOS QUE DETECTA SI EL JUGADOR TOCO LA PANTALLA 
    "onStartShouldSetPanResponder: () => true": DEVUELVE SIEMPRE "true" PARA PODER REACCIONAR A CUALQUIER TOQUE
    DE LA PANTALLA
    "onPanResponderMove: (_, gestureState) => { ... }": SE EJECUTA CADA VEZ QUE EL DEDO SE MUEVE POR LA PANTALLA
    "let newX = gestureState.moveX - PADDLE_WIDTH / 2": ESTO INDICA LA POSICION HORIZONTAL DEL DEDO, Y ESTA DIVIDO
    POR 2 PARA QUE SE CENTRE LA PALETA RESPECTO DEL DEDO (SINO LA PALETA APARECERIA DESPLAZADA)
    "newX = Math.max(0, Math.min(SCREEN_WIDTH - PADDLE_WIDTH, newX))": ESTA PARTE EVITA QUE LA PELTA SALGA DE LA PANTALLA;
    EL "Math.max..." EVITA QUE PASE DEL BORDE IZQUIERDO Y EL "Math.min..." EVITA QUE PASE DEL BORDE DERECHO
    "setPaddleX(newX)": ESTO MUEVE LA PALETA Y ACTUALIZA SU ESTADO CON LA NUEVA POSICION
    "useRef(...).current": ESTA TODO DENTRO DE UN "useRef" PARA EVITAR QUE LA CONST "panResponder" SE VUELVA A CREAR
    EN CADA RENDERIZACION


*/
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

//********************************************************************************************
// ACA ESTA LA LOGICA DEL MOVIMIENTO DE LA PELOTA (REBOTES, COLISION CON PALETA Y FIN DEL JUEGO)
//********************************************************************************************

/*
  "useEffect(() => { ... }, [gameOver])": SE ACTIVA AL COMENZAR EL JUEGO O CUANDO CAMBIA EL VALOR DE "gameOver"
  "if (gameOver) return": NO EJECUTA NADA, SIGNIFICA QUE SE PERDIO Y LA PELOTA NO SE MUEVE MAS
*/
  useEffect(() => {
    if (gameOver) return;

/*
  "const interval = setInterval(() => {...} , 10)": SIMULA LOS FPS DEL JUEGO, A MAYOR VALOR MENOS FPS (SE VE MAS LENTO)
  "let newX = prev.x + prev.dx;
   let newY = prev.y + prev.dy;
   let newDx = prev.dx;
   let newDy = prev.dy;": HACE EL MOVIMIENTO DE LA PELOTA; "x" Y "y" ES LA POSICION NUEVA, "dx" Y "dy" ES LA VELOCIDAD
   HORIZONTAL Y VERTICAL DE LA PELOTA
*/

    const interval = setInterval(() => {
      setBall((prev) => {
        let newX = prev.x + prev.dx;
        let newY = prev.y + prev.dy;
        let newDx = prev.dx;
        let newDy = prev.dy;

        /*
            "if (newX <= 0 || newX + BALL_SIZE >= SCREEN_WIDTH) {...}": AL TOCAR LOS BORDES LATERALES INVIERTE LA DIRECCION
            HACIA DONDE SE MUEVE LA PELOTA
        */
        if (newX <= 0 || newX + BALL_SIZE >= SCREEN_WIDTH) {
          newDx = -newDx;
        }

        /*
            "if (newY <= 0) {...}": AL TOCAR EL TECHO O BORDE SUPERIOR, REBOTA HACIA ABAJO
        */
        if (newY <= 0) {
          newDy = -newDy;
        }

        /*
            "const paddleTop": INDICA LA POSICION VERTICAL EN QUE LA PELOTA REBOTA CON LA PALETA
            "const isBallAbovePaddle": INDICA SI LA PELOTA ESTA TOCANDO LA PARTE SUPERIOR DE LA PALETA
            "const isBallWithinPaddle": INDICA SI LA PELOTA ESTA DENTRO DEL ANCHO DE LA PALETA
            "if (isBallAbovePaddle && isBallWithinPaddle && newDy > 0) {
            newDy = -newDy;
            setScore((s) => s + 1);
            }": SI "newDy > 0" SIGNIFICA QUE LA PELOTA ESTABA BAJANDO, ENTONCES "newDy = -newDy" HACE
            REBOTAR LA PELOTA Y "setScore((s) => s + 1)" SUMA UN PUNTO
        */
        const paddleTop = SCREEN_HEIGHT - PADDLE_HEIGHT;
        const isBallAbovePaddle = newY + BALL_SIZE >= paddleTop;
        const isBallWithinPaddle =
          newX + BALL_SIZE >= paddleRef.current &&
          newX <= paddleRef.current + PADDLE_WIDTH;

        if (isBallAbovePaddle && isBallWithinPaddle && newDy > 0) {
          newDy = -newDy;
          setScore((s) => s + 1);
        }

        /* 
            "if (newY + BALL_SIZE >= SCREEN_HEIGHT) {...}": SI LA PELOTA TOCA EL FONDO SIN TOCAR LA PALETA ENTONCES SE PIERDE
        */
        if (newY + BALL_SIZE >= SCREEN_HEIGHT) {
          setGameOver(true);
        }

        /*
            "return {...prev, ...}": DEVUELVE LA NUEVA POSICION Y DIRECCION DE LA PELOTA"
        */
        return {
          ...prev,
          x: newX,
          y: newY,
          dx: newDx,
          dy: newDy,
        };
      });
    }, 10);

    /*
        "return () => clearInterval(interval)": LIMPIA EL "setInterval"
    */
    return () => clearInterval(interval);
  }, [gameOver]);

  return (
    <ImageBackground 
        source={require("../../assets/canchaTennis.png")}
        style={styles.container} 
        resizeMode="stretch"
        {...panResponder.panHandlers}
    >
      <Text style={styles.score}>{score}</Text>
      {gameOver && <Text style={styles.gameOver}>¡GAME OVER!</Text>}

      {/* ESTILOS PELOTA */}
      <Image
        source={require("../../assets/tenisBall.png")}
        style={{
          width: BALL_SIZE,
          height: BALL_SIZE,
          position: "absolute",
          left: ball.x,
          top: ball.y,
        }}
      />

      {/* ESTILOS PALETA */}
      <View
        style={{
          position: "absolute",
          width: PADDLE_WIDTH,
          height: PADDLE_HEIGHT,
          backgroundColor: "blue",
          bottom: 0,
          left: paddleX,
        }}
      />
    </ImageBackground>
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
    opacity: 0.4
  },
  gameOver: {
    color: "red",
    fontSize: 32,
    textAlign: "center",
    marginTop: 20,
  },
  background: {
  flex: 1,
  resizeMode: 'cover',
  justifyContent: 'center',
  alignItems: 'center',
}
});
