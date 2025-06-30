import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../Hooks/useAuth";
import { obtenerUsuarios, guardarUsuarios } from "../../Hooks/storage";

export default function RegistroLoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // LIMPIA LOS CAMPOS CUANDO SE MUESTRA ESTA PANTALLA
  navigation.addListener("focus", () => {
    setUsername("");
    setPassword("");
  });

  const [usuarios, setUsuarios] = useState([]);

  // ACA BUSCA USUARIO EN ASYNCSTORAGE, PERO POR SI NO HAY CARGADOS NINGUNO ESTÁ ESTA LISTA COMO RESPALDO
  useEffect(() => {
    const cargarUsuarios = async () => {
      let data = await obtenerUsuarios();

      if (data.length === 0) {
        // SI NO HAY USUARIOS INICIA CON ESTA LISTA POR DEFECTO
        data = [
          { username: "admin", email: "admin@admin.admin", password: "123" },
          {
            username: "PedroPalotes",
            email: "pedro@pepepe.com",
            password: "123",
          },
          {
            username: "MonicaMusical",
            email: "monica@cine.com",
            password: "123",
          },
          {
            username: "VictorBelico",
            email: "victor@guerra.com",
            password: "123",
          },
          { username: "LauraLuz", email: "laura@brillo.com", password: "123" },
          {
            username: "CarlosCanto",
            email: "carlos@musica.com",
            password: "123",
          },
          { username: "NinaNube", email: "nina@cielo.com", password: "123" },
          {
            username: "OscarOceano",
            email: "oscar@marino.com",
            password: "123",
          },
          {
            username: "BrunoBosque",
            email: "bruno@selva.com",
            password: "123",
          },
          {
            username: "SilviaSolar",
            email: "silvia@astro.com",
            password: "123",
          },
          { username: "TomasTren", email: "tomas@viaje.com", password: "123" },
          {
            username: "EvaEstrella",
            email: "eva@espacio.com",
            password: "123",
          },
        ];
        await guardarUsuarios(data);
      }

      setUsuarios(data);
    };

    cargarUsuarios();
  }, []);

  // ACA SE MANEJA EL LOGIN
  const handleLogin = () => {
    //VALIDA QUE LOS CAMPOS NO ESTEN VACIOS
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
      Alert.alert("Error", "No se pudo iniciar sesión: " + error.message);
    }
  };

  return (
    //ESTO EVITA QUE EL TECLADO TAPE LOS INPUTS
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        ¿No tiene cuenta? Regístrese
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
    overflow: "hidden",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    paddingVertical: 12,
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
