import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.canchaButtons}>
        <TouchableOpacity style={styles.canchaButton}>
          <Text>Imagen Cancha 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.canchaButton}>
          <Text>Imagen Cancha 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.canchaButton}>
          <Text>Imagen Cancha 3</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scoreBox}>
        <Text style={styles.scoreTitle}>Mayor puntuación</Text>
        <Text style={styles.scoreNumber}>150</Text>
      </View>

      <View style={styles.menuButtons}>
        <Button title="INICIO" onPress={() => {}} />
        <Button title="RANKING" onPress={() => navigation.navigate('Ranking')} />
        <Button title="CERRAR SESIÓN" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  canchaButtons: {
    marginBottom: 30,
  },
  canchaButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  scoreBox: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 16,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  menuButtons: {
    width: '100%',
    marginTop: 20,
  },
});
