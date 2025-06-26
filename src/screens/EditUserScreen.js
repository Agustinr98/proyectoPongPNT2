import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Hooks/useAuth';
import { actualizarContraseña, eliminarUsuario } from '../../Hooks/storage.js';

export default function EditUserScreen() {
  const navigation = useNavigation();
  const { auth, logout } = useAuth();
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // CAMBIAR CONTRASEÑA
 const handleUpdatePassword = async () => {
  if (!actualPassword || !newPassword) {
    Alert.alert("Error", "Todos los campos son obligatorios");
    return;
  }

  if (actualPassword !== auth?.password) {
    Alert.alert("Error", "La contraseña actual no es correcta");
    return;
  }

  try {
    await actualizarContraseña(auth.username, newPassword);

    Alert.alert("Contraseña actualizada", "Por seguridad, volvé a iniciar sesión.", [
      {
        text: "OK",
        onPress: () => {
          logout();
          navigation.navigate("RegistroLoginScreen");
        },
      },
    ]);
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

// BORRAR USUARIO
const handleDeleteUser = () => {
  Alert.alert(
    'Confirmar eliminación',
    '¿Estás seguro que deseas eliminar tu usuario?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await eliminarUsuario(auth.username);
            logout();
            navigation.navigate('RegistroLoginScreen');
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario: {auth?.username}</Text>

      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        value={actualPassword}
        onChangeText={setActualPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Button title="Actualizar Contraseña" onPress={handleUpdatePassword} />

      <View style={styles.divider} />

      <Button
        title="Eliminar Usuario"
        color="red"
        onPress={handleDeleteUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  divider: {
    height: 30
  }
});
