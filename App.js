import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Screens/HomeScreen";
import RankingScreen from "./Screens/RankingScreen";
import LoginScreen from "./Screens/LoginScreen";
import GameScreen from './src/screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
