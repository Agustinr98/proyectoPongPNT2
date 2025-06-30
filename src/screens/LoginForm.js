import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { agregarUsuario } from "../../Hooks/storage";

export default function LoginForm() {
  const navigation = useNavigation();

  //PARA GUARDAR VALORES CORRESPONDIENTES
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //se fija que completen todos los campos antes de crear el usuario
  const handleCrearUsuario = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Por favor completá todos los campos.");
      return;
    }

    //VERIFICA QUE EL EMAIL TENGA TEXTO ANTES DE @, UN @, TEXTO Y PUNTO, Y TEXTO LUEGO DEL PUNTO
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(email)) {
      Alert.alert("Error", "Por favor ingresá un email válido.");
      return;
    }

    try {
      await agregarUsuario({ username, email, password });
      Alert.alert("Usuario creado", "El usuario fue creado correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("RegistroLoginScreen"), //VUELVE A PANTALLA DE REGISTRO-LOGIN
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      //ajusta el teclado para que no tape los campos de entrada
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Crear Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.buttonCancel]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCrearUsuario}>
            <Text style={styles.buttonText}>Crear Usuario</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  form: {
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
