import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
//importar el boton
import { TouchableOpacity } from 'react-native';
//Aviso de error
import { Alert } from 'react-native';

function CreateAccountScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isValidEmail, setIsValidEmail] = React.useState(true);
  
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
  
    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Usuario creado');
          const user = userCredential.user;
          console.log(user);
          navigation.navigate('Login', { message: 'La cuenta se creó exitosamente' });
          Alert.alert('Usuario ha sido creado con éxito');

        })
        .catch((error) => {
          console.log(error);
          Alert.alert(error.message, 'Información incompleta o ya estas registrado, por favor intente de nuevo');
        });
  
      
    };
  
    const validateEmail = (text) => {
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        setIsValidEmail(emailPattern.test(text));
      };
    
  return (
    <View style={styles.container}>
      <Text  style={styles.Registro} >Registro de usuario</Text>
      <TextInput onChangeText={(Text) => {validateEmail(Text); setEmail(Text);}} placeholder="Correo Electronico" style={[styles.TextInput, !isValidEmail && styles.inputInvalid]}
        />
        {!isValidEmail && (
        <Text style={styles.errorText}>Correo electrónico inválido</Text>
        )}
        <TextInput onChangeText={(Text) => setPassword(Text)} placeholder="Contraseña" style={styles.TextInput} secureTextEntry  />
        <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { marginTop: 20 }]}>
  <Text style={styles.buttonText}>Crear cuenta</Text>
</TouchableOpacity>
    </View>
  );
  }

export default CreateAccountScreen;

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
    Registro:{
      fontSize: 60,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000', 
      margin: 10,
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
      fontWeight: 'Roboto',
      fontSize: 15,
      color: '#fff',
      textAlign: 'center',
      padding: 10,
    }
  });