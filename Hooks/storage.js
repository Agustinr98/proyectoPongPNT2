// SE GUARDAN LOS USUARIOS EN LA MEMORIA DEL CELULAR, ASI QUE CADA UNO TENDRA SU PROPIA BASE DE USUARIOS
import AsyncStorage from "@react-native-async-storage/async-storage";

const USUARIOS_KEY = "usuarios_guardados";

// GUARDAR USUARIOS
export const guardarUsuarios = async (usuarios) => {
  try {
    await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  } catch (e) {}
};

// BUSCAR USUARIO LEE LOS USUARIOS GUARDADOS EN ASYNCSTORAGE, SI ESTA VACIA DEVUELVE ARRAY VACIO
export const obtenerUsuarios = async () => {
  try {
    const data = await AsyncStorage.getItem(USUARIOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

// AGREGAR USUARIO CARGA TODOS LOS USUARIOS Y VERIFICA QUE NO SE REPITE USER Y CORREO
export const agregarUsuario = async (nuevoUsuario) => {
  const usuarios = await obtenerUsuarios();
  const yaExiste = usuarios.some(
    (u) =>
      u.username === nuevoUsuario.username || u.email === nuevoUsuario.email
  );

  if (yaExiste) {
    throw new Error("El usuario o email ya está registrado");
  }

  // SE INICIA CON PUNTAJE INICIAL EN 0
  const usuarioConPuntaje = { ...nuevoUsuario, highScore: 0 };

  usuarios.push(usuarioConPuntaje);
  await guardarUsuarios(usuarios);
};

// CAMBIAR CONTRASEÑA BUSCA AL USUARIO Y SI LO ENCUENTRA CAMBIA LA CONTRASEÑA
export const actualizarContraseña = async (username, nuevaPassword) => {
  const usuarios = await obtenerUsuarios();

  const index = usuarios.findIndex((u) => u.username === username);

  if (index === -1) {
    throw new Error("Usuario no encontrado");
  }

  usuarios[index].password = nuevaPassword;

  await guardarUsuarios(usuarios);
};

// ELIMINAR USUARIO BUSCA AL USUARIO POR USERNAME
export const eliminarUsuario = async (username) => {
  const usuarios = await obtenerUsuarios();

  const nuevosUsuarios = usuarios.filter((u) => u.username !== username);

  if (nuevosUsuarios.length === usuarios.length) {
    throw new Error("Usuario no encontrado");
  }

  await guardarUsuarios(nuevosUsuarios);
};
