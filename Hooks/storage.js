// SE GUARDAN LOS USUARIOS EN LA MEMORIA DEL CELULAR, ASI QUE CADA UNO TENDRA SU PROPIA BASE DE USUARIOS
import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIOS_KEY = 'usuarios_guardados';

export const guardarUsuarios = async (usuarios) => {
  try {
    await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  } catch (e) {
    console.error('Error al guardar usuarios:', e);
  }
};

// BUSCAR USUARIO
export const obtenerUsuarios = async () => {
  try {
    const data = await AsyncStorage.getItem(USUARIOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error al leer usuarios:', e);
    return [];
  }
};

// AGREGAR USUARIO
export const agregarUsuario = async (nuevoUsuario) => {
  const usuarios = await obtenerUsuarios();
  const yaExiste = usuarios.some(
    (u) => u.username === nuevoUsuario.username || u.email === nuevoUsuario.email
  );

  if (yaExiste) {
    throw new Error('El usuario o email ya está registrado');
  }

  usuarios.push(nuevoUsuario);
  await guardarUsuarios(usuarios);
};

// CAMBIAR CONTRASEÑA
export const actualizarContraseña = async (username, nuevaPassword) => {
  const usuarios = await obtenerUsuarios();

  const index = usuarios.findIndex((u) => u.username === username);

  if (index === -1) {
    throw new Error("Usuario no encontrado");
  }

  usuarios[index].password = nuevaPassword;

  await guardarUsuarios(usuarios);
};

// ELIMINAR USUARIO
export const eliminarUsuario = async (username) => {
  const usuarios = await obtenerUsuarios();

  const nuevosUsuarios = usuarios.filter((u) => u.username !== username);

  if (nuevosUsuarios.length === usuarios.length) {
    throw new Error("Usuario no encontrado");
  }

  await guardarUsuarios(nuevosUsuarios);
};