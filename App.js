import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen";
import RegistroLoginScreen from "./src/screens/RegistroLoginScreen";
import LeaderBoard from "./src/screens/LeaderBoard";
import LoginScreen from "./src/screens/LoginForm";
import GameScreen from './src/screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistroLoginScreen">
        <Stack.Screen name="RegistroLoginScreen" component={RegistroLoginScreen} options={{ headerTitle: "Proyecto PONG" }} />
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Ranking" component={LeaderBoard} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
