import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Correo de recuperación de contraseña enviado',
          'Por favor, revisa tu bandeja de entrada para restablecer tu contraseña.'
        );
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          'Error al enviar el correo de recuperación de contraseña',
          'Por favor, inténtalo de nuevo más tarde.'
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Restablecer Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    paddingStart: 30, 
    width: '80%',
    height: 50,
    margin: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  button: {
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
    margin: 10,
  },
};
