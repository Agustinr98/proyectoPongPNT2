import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Hooks/useAuth';

export default function EditUserScreen() {
  const navigation = useNavigation();
  const { auth, logout } = useAuth();
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdatePassword = () => {
    if (!actualPassword || !newPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Validar que la contraseña actual ingresada coincida con la guardada
    if (actualPassword !== auth?.password) {
      Alert.alert('Error', 'La contraseña actual no es correcta');
      return;
    }

    // FUTURO: hacer fetch al backend para actualizar la contraseña

    // Por ahora solo mostrar mensaje y cerrar sesión
    Alert.alert('Contraseña actualizada', 'Por seguridad, volvé a iniciar sesión.', [
      {
        text: 'OK',
        onPress: () => {
          logout();
          navigation.navigate('RegistroLoginScreen');
        }
      }
    ]);

    // Limpiar campos
    setActualPassword('');
    setNewPassword('');
  };

  const handleDeleteUser = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro que deseas eliminar tu usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            // FUTURO: hacer fetch al backend para eliminar el usuario

            logout();
            navigation.navigate('RegistroLoginScreen');
          }
        }
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
