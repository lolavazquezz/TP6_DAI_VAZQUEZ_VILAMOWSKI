import React, { useState, useEffect } from 'react';
import Titulo from './components/Titulo/Titulo';
import Tarea from './components/Tarea/Tarea';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Alert, Modal, StyleSheet, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput as PaperInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [newTarea, setNewTarea] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const loadTareas = async () => {
      try {
        const tareasGuardadas = await AsyncStorage.getItem('tareas');
        if (tareasGuardadas) {
          setTareas(JSON.parse(tareasGuardadas));
        }
      } catch (error) {
        console.error('Error cargando tareas:', error);
      }
    };
    loadTareas();
  }, []);

  useEffect(() => {
    const saveTareas = async () => {
      try {
        await AsyncStorage.setItem('tareas', JSON.stringify(tareas));
      } catch (error) {
        console.error('Error guardando tareas:', error);
      }
    };
    saveTareas();
  }, [tareas]);

  const handleAddTarea = () => {
    if (newTarea.trim().length === 0 || descripcion.trim().length === 0) {
      Alert.alert('Error', 'Por favor ingrese todos los campos');
      return;
    }
    setTareas([
      ...tareas,
      {
        tarea: newTarea,
        descripcion: descripcion,
        id: Date.now(),
        fecha: Date.now(),
        fechaTachado: null,
      },
    ]);
    setNewTarea('');
    setDescripcion('');
    setModalVisible(false);
  };

  const handleTareaUpdate = (updatedTareas) => {
    setTareas(updatedTareas);
    AsyncStorage.setItem('tareas', JSON.stringify(updatedTareas)).catch(error => {
      console.error('Error guardando tareas actualizadas:', error);
    });
  };

  const renderItem = ({ item }) => (
    <Tarea tarea={item} tareas={tareas} setTareas={handleTareaUpdate} />
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <Titulo />

          <FlatList
            data={tareas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />

          <View style={styles.centeredView}>
            <Button
              mode="contained"
              onPress={() => setModalVisible(true)}
              style={styles.addButton}
            >
              Agregar Tarea
            </Button>

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
                  <PaperInput
                    label="Escribe una nueva tarea..."
                    value={newTarea}
                    onChangeText={setNewTarea}
                    style={styles.input}
                  />
                  <PaperInput
                    label="Descripción..."
                    value={descripcion}
                    onChangeText={setDescripcion}
                    style={styles.input}
                  />
                  <Button
                    mode="contained"
                    onPress={handleAddTarea}
                    style={styles.modalButton}
                  >
                    Agregar
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => setModalVisible(false)}
                    style={styles.modalButton}
                  >
                    Cancelar
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    padding: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%', // Aumentar el ancho del modal
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    margin: 10,
  },
  modalButton: {
    marginVertical: 5,
    width: '100%',
    borderRadius: 10,
  },
});

