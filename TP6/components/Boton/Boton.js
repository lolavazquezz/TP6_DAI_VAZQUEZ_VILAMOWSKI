import "./Boton.css";
import React from "react";
import { useState } from 'react';
import {Alert, Modal, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';
function Boton({tareas, setTareas}){
    let [tareaRapida, setTareaRapida] = useState();
    function tareaMasRapida(){
        let rapida = 9999999999999999999999999999;
        let nom = "";
        tareas.filter(tareas => tareas.fechaTachado !== undefined).forEach(n=>{
            if (n.fechaTachado - n.fecha < rapida) {
                rapida = n.fechaTachado - n.fecha;
                nom = n.tarea;
            }
        })
        setTareaRapida(nom);
       
    }
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={tareaMasRapida}><Text>Calcular tarea más rápida</Text></TouchableOpacity>
            {tareaRapida ? <Text>La tarea más rápida en realizarse fue: {tareaRapida}</Text> : <></>}
        </SafeAreaView>
    );

}
export default Boton;