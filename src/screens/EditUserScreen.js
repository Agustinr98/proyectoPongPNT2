import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (actualPassword !== auth?.password) {
      Alert.alert('Error', 'La contraseña actual no es correcta');
      return;
    }

    try {
      await actualizarContraseña(auth.username, newPassword);

      Alert.alert('Contraseña actualizada', 'Por seguridad, volvé a iniciar sesión.', [
        {
          text: 'OK',
          onPress: () => {
            logout();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
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

      <TouchableOpacity style={styles.primaryButton} onPress={handleUpdatePassword}>
        <Text style={styles.primaryButtonText}>Actualizar Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButton, { backgroundColor: '#ff4d4d', borderColor: '#ff4d4d' }]}
        onPress={handleDeleteUser}
      >
        <Text style={[styles.secondaryButtonText, { color: '#fff' }]}>Eliminar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1A2A3A',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#3578E5',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3578E5',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3578E5',
  },
});
