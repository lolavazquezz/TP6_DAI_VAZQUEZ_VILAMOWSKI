import "./Formulario.css";
import {Alert, Modal, TextInput, StyleSheet, SafeAreaView, Text, Pressable, TouchableOpacity, View} from 'react-native';
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
        <SafeAreaView>
            <View onSubmit={agregarTarea}>
                <TextInput name="tarea"></TextInput>
                <TouchableOpacity><Text>Agregar tarea</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default Formulario;