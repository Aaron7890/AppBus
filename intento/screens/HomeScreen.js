import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';



export function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (

    <View style={styles.container}>
    <View style={styles.subContainer1}>
      <Text style={styles.textobus}>BusApp</Text>
    </View>
    <View style={styles.subContainer2}>
        <Text style={styles.Textogei}>Bienvenidos a tu app de transporte</Text>
        <TouchableOpacity style={styles.button} onPress={() => console.log("Ver mis rutas")}>
        <Text style={styles.buttonText}>Ver mis rutas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Ver mi información</Text>
        </TouchableOpacity>
    </View>


    <View style={styles.piedepagina}>
        <Text style={styles.piedepagina}>© 2023 BusApp. Todos los derechos reservados.</Text>
    </View>

    <Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}>
<View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Contenido del modal</Text>
           
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
</Modal>
  </View>

   
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
     
    },
    subContainer1: {
      backgroundColor: '#294380',
      fontSize: 70,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff',
      
    },
    textobus:{
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff', 
        margin: 10,
    },
    subContainer2: {
        flex: 1,
      backgroundColor: '#f1f1f1',
      alignItems: 'center',
    },
    Textogei:{
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        margin:50,
        
    },
   
    button: {
        backgroundColor: '#294380',
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },    
    piedepagina: {
        flex: -1,
        backgroundColor: '#294380',
        fontWeight: 'Roboto',
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        padding: 10,
        
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    
  });
