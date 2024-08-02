import "./Formulario.css";
import {Alert, Modal, TextInput, StyleSheet, Text, Pressable, Button, View} from 'react-native';
const Formulario = ({tareas, setTareas}) => {
    const agregarTarea = (e) => {
        e.preventDefault();
            setTareas([
                ...tareas,
                {
                  tarea: e.target.tarea.value,
                  id: Date.now(),
                  fecha: Date.now(),
                  fechaTachado: null,
                },
            ]);
        
    }
    return (
        <>
            <form onSubmit={agregarTarea}>
                <TextInput type="text" name="tarea" class="u-full-width"></TextInput>
                <Button class="u-full-width button-primary">Agregar tarea</Button>
            </form>
        </>
    )
}
export default Formulario;