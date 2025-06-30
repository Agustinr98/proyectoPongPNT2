//ESTO NO SE LLEGO A IMPLEMENTAR
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserItem({ user, isCurrentUser }) {
  // isCurrentUser indica si el usuario es el que está logueado
  // si es así, se resalta el card con un color diferente
  return (
    <View style={[styles.card, isCurrentUser && styles.highlight]}>
      <Text style={styles.name}>{user.nombre} {user.apellido}</Text>
      <Text style={styles.points}>Puntos: {user.puntos}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 16,
    marginTop: 5,
  },
  highlight: {
    backgroundColor: '#d1e7dd', // verde claro si es el usuario logueado
  },
});
