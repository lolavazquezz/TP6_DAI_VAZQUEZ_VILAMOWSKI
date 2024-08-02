import React, { useState } from 'react';
import Titulo from './components/Titulo/Titulo';
import Boton from './components/Boton/Boton';
import Tarea from './components/Tarea/Tarea';
import { Alert, Modal, SafeAreaView, StyleSheet, FlatList, Text, Pressable, TextInput, View } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [newTarea, setNewTarea] = useState('');

  const handleAddTarea = () => {
    if (newTarea.trim().length === 0) {
      Alert.alert('Error', 'Por favor ingrese una tarea');
      return;
    }
    setTareas([
      ...tareas,
      {
        tarea: newTarea,
        id: Date.now(),
        fecha: Date.now(),
        fechaTachado: null,
      },
    ]);
    setNewTarea('');
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Tarea tarea={item} tareas={tareas} setTareas={setTareas} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Titulo />
      <View style={styles.botones}>
        <Boton tareas={tareas} setTareas={setTareas} />
      </View>

      <FlatList
        data={tareas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Asegúrate de que cada tarea tenga una propiedad `id` única
      />

      <View style={styles.centeredView}>
        <Pressable
          style={[styles.TouchableOpacity, styles.TouchableOpacityOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Agregar Tarea</Text>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Escribe una nueva tarea..."
                value={newTarea}
                onChangeText={setNewTarea}
              />
              <Pressable
                style={[styles.TouchableOpacity, styles.TouchableOpacityClose]}
                onPress={handleAddTarea}
              >
                <Text style={styles.textStyle}>Agregar</Text>
              </Pressable>
              <Pressable
                style={[styles.TouchableOpacity, styles.TouchableOpacityClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  botones: {
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: 200,
  },
  TouchableOpacity: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  TouchableOpacityOpen: {
    backgroundColor: '#F194FF',
  },
  TouchableOpacityClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
