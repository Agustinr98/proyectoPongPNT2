import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../Hooks/useAuth";
import { obtenerUsuarios, guardarUsuarios } from "../../Hooks/storage.js";

export default function RegistroLoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  navigation.addListener("focus", () => {
    setEmail("");
    setUsername("");
    setPassword("");
  });

  // MODIFIQUE ESTO ----------------------
  const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
  const cargarUsuarios = async () => {
    let data = await obtenerUsuarios();

    if (data.length === 0) {
      // SI NO HAY USUARIOS INICIA CON ESTA LISTA POR DEFECTO
      data = [
        { username: "admin", email: "admin@admin.admin", password: "123" },
        { username: "PedroPalotes", email: "pedro@pepepe.com", password: "123" },
        { username: "MonicaMusical", email: "monica@cine.com", password: "123" },
        { username: "VictorBelico", email: "victor@guerra.com", password: "123" },
        { username: "LauraLuz", email: "laura@brillo.com", password: "123" },
        { username: "CarlosCanto", email: "carlos@musica.com", password: "123" },
        { username: "NinaNube", email: "nina@cielo.com", password: "123" },
        { username: "OscarOceano", email: "oscar@marino.com", password: "123" },
        { username: "BrunoBosque", email: "bruno@selva.com", password: "123" },
        { username: "SilviaSolar", email: "silvia@astro.com", password: "123" },
        { username: "TomasTren", email: "tomas@viaje.com", password: "123" },
        { username: "EvaEstrella", email: "eva@espacio.com", password: "123" },
      ];

      await guardarUsuarios(data); // ACA SE GUARDAN LOS USUARIOS EN ASYNCSTORAGE
    }

    setUsuarios(data);
  };

  cargarUsuarios();
}, []); // HASTA ACA ------------------

  const handleLogin = () => {
    try {
      if (username.length === 0 || password.length === 0) {
        throw new Error("El usuario y la contraseña son obligatorios");
      }

      const usuarioEncontrado = usuarios.find(
        (u) => u.username === username && u.password === password
      );

      if (usuarioEncontrado) {
        login(usuarioEncontrado); 
      } else {
        throw new Error("La contraseña o el usuario son incorrectos");
      }
    } catch (error) {
      //console.error("Error durante el inicio de sesión: ", error);
      Alert.alert("Error", "No se pudo iniciar sesión: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Iniciar Sesión" onPress={handleLogin} />

      <Button
        title="¿No tiene cuenta? Regístrese"
        onPress={() => navigation.navigate("Login")}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  link: {
    color: "#3578E5",
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  minitext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
});
