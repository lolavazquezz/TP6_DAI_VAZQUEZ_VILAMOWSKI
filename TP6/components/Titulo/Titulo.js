import React from "react";
import { Text, StyleSheet, View } from 'react-native';

function Titulo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6F61',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});

export default Titulo;
