import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, KeyboardAvoidingView, StyleSheet } from "react-native";



export default function RegistroLoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Solo utilizado para simular un login, esto vendria del back
    const [auth, setAuth] = useState(null);

    navigation.addListener('focus', () => {
        setEmail('');
        setUsername('');
        setPassword('');
    });

    const usuarios =
        [
            { username: 'admin', email: 'admin@admin.admin', password: '123' },
            { username: 'PedroPalotes', email: 'pedro@pepepe.com', password: '123' },
            { username: 'PedroPalotes', email: 'pedro@pepepe.com', password: '123' },
            { username: 'MonicaMusical', email: 'monica@cine.com', password: '123' },
            { username: 'VictorBelico', email: 'victor@guerra.com', password: '123' },
        ];

    const handleLogin = () => {
        console.debug("Email:", email);
        console.debug("Password:", password);
        try {
            // Aca va la logica para el login, todavia no lo implementamos en el back
            // Vamos a usar JWTs, estos seguramente se van a almacenar en el AsyncStorage de Expo o LocalStorage de React Native
            if (username.length === 0 || password.length === 0) {
                throw new Error("El usuario y la contraseña son obligatorios");
            }

            // Simulacion de un login
            const usuarioEncontrado = usuarios.find(u => u.username === username);

            // Esto está muy verde, pero es para simular un login
            if (usuarioEncontrado && usuarioEncontrado.password === password) {
                const authData = {
                    access_token: "1234567890abcdef",
                    expires_in: 3600,
                    refresh_token: "abcdef1234567890",
                    token_type: "Bearer",
                    user: {
                        username: usuarioEncontrado.username,
                        email: usuarioEncontrado.email
                    }
                }
                setAuth(authData);
                navigation.navigate('Inicio');
            } else {
                throw new Error("La contraseña o el email son incorrectos");
            }

        } catch (error) {
            console.error("Error durante el inicio de sesión: ", error);
            Alert.alert("Error", "No se pudo iniciar sesión: " + error.message);
        }
    }

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
            {/* TODO Esto deberia llevar a una pantalla de recupero de contraseña, quiza? */}
            {/* Creo que el enviar un mail desde el front está fuera de nuestra jurisdiccion en el TP */}
            <Text style={styles.minitext}>¿Olvido su contraseña?</Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    minitext: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center'
    },
});

