import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../Hooks/useAuth';
import UserList from '../components/UserList';

export default function LeaderBoard() {
  const { auth } = useAuth();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const top10 = [
      { nombre: 'PedroPalotes', puntos: 150 },
      { nombre: 'MonicaMusical',puntos: 130 },
      { nombre: 'VictorBelico', puntos: 110 },
      { nombre: 'LauraLuz', puntos: 100 },
      { nombre: 'CarlosCanto', puntos: 95 },
      { nombre: 'NinaNube', puntos: 90 },
      { nombre: 'OscarOceano', puntos: 85 },
      { nombre: 'BrunoBosque', puntos: 82 },
      { nombre: 'SilviaSolar', puntos: 80 },
      { nombre: 'TomasTren', puntos: 78 },
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

