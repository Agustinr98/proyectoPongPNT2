import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const LeaderboardScreen = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Simulacion de carga de datos de usuarios 
    const datosEjemplo = [
      { nombre: 'Juan', apellido: 'Pérez', puntos: 150 },
      { nombre: 'María', apellido: 'Gómez', puntos: 180 },
      { nombre: 'Carlos', apellido: 'Ruiz', puntos: 140 },
      { nombre: 'Lucía', apellido: 'Fernández', puntos: 190 },
      { nombre: 'Pedro', apellido: 'Martínez', puntos: 120 },
      { nombre: 'Ana', apellido: 'López', puntos: 170 },
      { nombre: 'Luis', apellido: 'Torres', puntos: 130 },
      { nombre: 'Sofía', apellido: 'Ramírez', puntos: 160 },
      { nombre: 'Diego', apellido: 'Suárez', puntos: 110 },
      { nombre: 'Florencia', apellido: 'Alonso', puntos: 100 },
    ];


    const ordenado = datosEjemplo.sort((a, b) => b.puntos - a.puntos);
    setUsuarios(ordenado);
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Leaderboard</Text>
      <ScrollView style={styles.scroll}>
        {usuarios.map((usuario, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.posicion}>#{index + 1}</Text>
            <View style={styles.info}>
              <Text style={styles.nombre}>{usuario.nombre} {usuario.apellido}</Text>
              <Text style={styles.puntos}>{usuario.puntos} pts</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
  },
    card: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
     minHeight: 90,
  },
  posicion: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 50,
  },
  info: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nombre: {
    fontSize: 16,
  },
  puntos: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;