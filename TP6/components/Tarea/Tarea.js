import "./Tarea.css";
import { useState } from "react";
import {Alert, Modal, TextInput, Button, StyleSheet, Text, Pressable, View} from 'react-native';
const Tarea = ({ tarea, tareas, setTareas}) => {
  let [tachado, setTachado] = useState(false);
  function tachar(id) {
    setTachado(!tachado);

    let tareasActualizado = tareas.map(t => t.id === id ? 
      {
        ...t,
        fechaTachado: !tachado ? Date.now() : undefined,
      } : t);
    
    setTareas(tareasActualizado)
  }
  return (
    <>
      {tachado ? (
        <div>
          <TextInput
            checked
            type="checkbox"
            onClick={() => tachar(tarea.id)}
          />
          <span class="tachado">{tarea.tarea}</span>
        </div>
      ) : (
        <div>
          <TextInput type="checkbox" onClick={() => tachar(tarea.id)} />
          <span>{tarea.tarea}</span>
        </div>
      )}
    </>
  );
};
export default Tarea;