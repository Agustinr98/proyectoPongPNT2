import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../Hooks/useAuth';
import UserList from '../components/UserList';

export default function LeaderBoard() {
  const { auth } = useAuth();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const top10 = [
      { nombre: 'Juan', apellido: 'Pérez', puntos: 150 },
      { nombre: 'Ana', apellido: 'García', puntos: 130 },
      { nombre: 'Luis', apellido: 'Martínez', puntos: 110 },
      { nombre: 'Lucía', apellido: 'Fernández', puntos: 100 },
      { nombre: 'Carlos', apellido: 'Gómez', puntos: 95 },
      { nombre: 'Laura', apellido: 'Ruiz', puntos: 90 },
      { nombre: 'Pedro', apellido: 'Lopez', puntos: 85 },
      { nombre: 'María', apellido: 'Sosa', puntos: 82 },
      { nombre: 'Nico', apellido: 'Farias', puntos: 80 },
      { nombre: 'Elena', apellido: 'Mendez', puntos: 78 },
    ];
    setUsuarios(top10);
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking de jugadores</Text>
      <UserList usuarios={usuarios} currentUsername={auth?.user?.username} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

