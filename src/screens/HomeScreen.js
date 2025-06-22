import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [highScore, setHighScore] = useState(0);

  const cards = [
    { image: require('../../assets/canchaBasquet.png'), label: 'Basquet Pong', mode: 'basquet' },
    { image: require('../../assets/canchaFutbol.png'), label: 'Fútbol Pong', mode: 'futbol' },
    { image: require('../../assets/canchaTennis.png'), label: 'Tennis Pong', mode: 'tenis' },
  ];

  const loadHighScore = async () => {
    try {
      const score = await AsyncStorage.getItem('highScore');
      if (score !== null) {
        setHighScore(parseInt(score));
      }
    } catch (e) {
      console.error('Error al cargar el puntaje máximo:', e);
    }
  };

  useEffect(() => {
    loadHighScore();
  }, []);

  const goToGame = (mode) => {
    navigation.navigate('Game', { mode });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>PONG</Text>

        <Text style={styles.scoreTitle}>Mejor puntuación de todos los tiempos</Text>
        <Text style={styles.score}>🏆 {highScore}</Text>

        <View style={styles.cardContainer}>
          {cards.map((card, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => goToGame(card.mode)}>
              <Image source={card.image} style={styles.cardImage} resizeMode="cover" />
              <Text style={styles.cardLabel}>{card.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continuar Juego */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => goToGame('tenis')}>
          <Text style={styles.buttonText}>Continuar juego</Text>
        </TouchableOpacity>

        {/* Juego nuevo */}
        <TouchableOpacity style={styles.secondaryButton} onPress={() => goToGame('tenis')}>
          <Text style={styles.secondaryText}>Juego nuevo</Text>
        </TouchableOpacity>

        {/* Ranking */}
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('LeaderBoard')}>
          <Text style={styles.secondaryText}>Ranking</Text>
        </TouchableOpacity>

        {/* Inicio */}
        <TouchableOpacity style={[styles.secondaryButton, { marginBottom: 20 }]} onPress={() => navigation.navigate('LoginForm')}>
          <Text style={styles.secondaryText}>Inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FB' },
  scroll: { alignItems: 'center', paddingVertical: 30 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#1A2A3A' },
  scoreTitle: { fontSize: 16, color: '#6D7D8B', marginTop: 10 },
  score: { fontSize: 30, fontWeight: 'bold', color: '#1A2A3A', marginVertical: 10 },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  card: {
    width: 110,
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#1A2A3A',
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#3578E5',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  secondaryButton: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderColor: '#3578E5',
    borderWidth: 2,
    marginBottom: 15,
  },
  secondaryText: {
    color: '#3578E5',
    fontSize: 18,
  },
});
