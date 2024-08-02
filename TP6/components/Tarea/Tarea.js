import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable, RectButton } from 'react-native-gesture-handler';

const Tarea = ({ tarea, tareas, setTareas }) => {
  const [tachado, setTachado] = useState(tarea.fechaTachado !== null);

  function tachar(id) {
    const updatedTareas = tareas.map(t =>
      t.id === id
        ? { ...t, fechaTachado: tachado ? null : Date.now() }
        : t
    );
    setTachado(!tachado);
    setTareas(updatedTareas);
  }

  function eliminarTarea() {
    const tareasActualizadas = tareas.filter(t => t.id !== tarea.id);
    setTareas(tareasActualizadas);
  }

  const renderRightActions = () => (
    <RectButton style={styles.deleteButton} onPress={eliminarTarea}>
      <Text style={styles.deleteText}>Eliminar</Text>
    </RectButton>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => tachar(tarea.id)}>
          <Text style={tachado ? styles.tachado : styles.text}>{tarea.tarea}</Text>
          {tarea.descripcion ? (
            <Text style={styles.descripcion}>{tarea.descripcion}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E2E2E',
    borderRadius: 12,
    marginVertical: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: '#F5F5F5',
  },
  tachado: {
    fontSize: 18,
    color: '#B0B0B0',
    textDecorationLine: 'line-through',
  },
  descripcion: {
    fontSize: 16,
    color: '#CCCCCC',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 100,
    borderRadius: 10,
  },
  deleteText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});

export default Tarea;
