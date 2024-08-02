import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';

const Tarea = ({ tarea, tareas, setTareas }) => {
  const [tachado, setTachado] = useState(false);

  function tachar(id) {
    setTachado(!tachado);

    let tareasActualizado = tareas.map(t =>
      t.id === id
        ? { ...t, fechaTachado: !tachado ? Date.now() : undefined }
        : t
    );

    setTareas(tareasActualizado);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => tachar(tarea.id)}>
        <Text style={tachado ? styles.tachado : styles.text}>{tarea.tarea}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
  },
  tachado: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
});

export default Tarea;
