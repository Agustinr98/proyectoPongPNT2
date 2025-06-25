import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen";
import RegistroLoginScreen from "./src/screens/RegistroLoginScreen";
import LeaderBoard from "./src/screens/LeaderBoard";
import GameScreen from './src/screens/GameScreen';
import { AuthProvider, useAuth } from './Hooks/useAuth';
import LoginForm from './src/screens/LoginForm';


const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { auth } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {!auth ? (
        <>
          <Stack.Screen name="RegistroLoginScreen" component={RegistroLoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginForm} />
        </>
      ) : (
        <>
          <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
          <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
