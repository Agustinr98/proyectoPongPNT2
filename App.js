import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Screens/HomeScreen";
import RankingScreen from "./Screens/RankingScreen";
import LoginScreen from "./Screens/LoginScreen";
import GameScreen from './src/screens/GameScreen';
import RegistroLoginScreen from './Screens/RegistroLoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistroLoginScreen">
        <Stack.Screen name="RegistroLoginScreen" component={RegistroLoginScreen} options={{ headerTitle: "Proyecto PONG" }} />
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
