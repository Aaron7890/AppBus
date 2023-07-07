import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
//Conexion a firebase
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
//Aviso de error
import { Alert } from 'react-native';
//Navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
//Importacion de la pantalla HomeScreen
import { HomeScreen } from './screens/HomeScreen';
//importar el boton
import { TouchableOpacity } from 'react-native';
//Importas la vista crear usuario
import CreateAccountScreen from './screens/CreateAccountScreen';
//Importar la vista de resetear contraseña
import ResetPasswordScreen from './screens/ResetPasswordScreen';












//Esta funcion es para validar el correo electronico
function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
//Esta es la vista completa de la pantalla de login
function LoginScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isValidEmail, setIsValidEmail] = React.useState(true);
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    

    const handleForgotPassword = () => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert("Correo de recuperación de contraseña enviado", "Por favor, revisa tu bandeja de entrada para restablecer tu contraseña.");
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error al enviar el correo de recuperación de contraseña", "Por favor, inténtalo de nuevo más tarde.");
        });
    };
    
//Funciona para crear una cuenta
    const handleCreateAccount = () => {
      navigation.navigate('CreateAccount');
    };
    //Funcion para iniciar sesion
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Usuario logueado');
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('Home', { message: 'Bienvenido' });
            })
            .catch((error) => {
                console.log(error);
                Alert.alert(error.message, 'Credenciales erroneas, por favor intente de nuevo');
                
            });
    }; 

    const validateEmail = (text) => {
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        setIsValidEmail(emailPattern.test(text));
      };
    
//Aqui retornas la vista de la pantalla de login
    return (
        <View style={styles.container}>
        <Text style={styles.titulo}>BusApp</Text>
        <Text style={styles.subtitulo}>Inicio de sesion</Text>
        
        <TextInput onChangeText={(Text) => {validateEmail(Text); setEmail(Text);}} placeholder="Correo Electronico" style={[styles.TextInput, !isValidEmail && styles.inputInvalid]}
        />
        {!isValidEmail && (
        <Text style={styles.errorText}>Correo electrónico inválido</Text>
        )}
        <TextInput onChangeText={(Text) => setPassword(Text)} placeholder="Contraseña" style={styles.TextInput} secureTextEntry  />
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
  <Text style={styles.buttonText}>Iniciar sesión</Text>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => navigation.navigate('ResetPassword')}
  style={[styles.button, { marginTop: 20 }]}
>
  <Text style={styles.buttonText}>¿Olvidaste tu contraseña?</Text>
</TouchableOpacity>
<TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { marginTop: 20 }]}>
  <Text style={styles.buttonText}>¿No tienes una cuenta?</Text>
</TouchableOpacity>


        <StatusBar style="auto" />
        
    </View>
    );
};



const Stack = createStackNavigator();
//Aqui se exporta la funcion de la pantalla de login
export default function App() {
    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen}  />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Rutas" component={HomeScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccountScreen}  />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
//Aqui estan las hojas de estilo de la pantalla de login
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo:{
    fontSize: 70,
    color: '#000',
    fontWeight: 'bold',
  },

  subtitulo:{
    fontSize: 20,
    color: 'gray',
  },

  TextInput:{
    padding: 10,
    paddingStart: 30, 
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },

  textito:{
    fontSize: 14,
    color: '#294380',
  },

  button: {
    marginTop: 20,
    backgroundColor: '#294380',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputInvalid: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  container2:{
    flex: -1,
    backgroundColor: '#294380',
    
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  }
});