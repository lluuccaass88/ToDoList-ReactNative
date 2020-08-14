import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 

export default function App() {
  const [Task, setTask] = useState([])
  const [newTask, setNewTask] = useState('')

  return (
    <>
    <View style={styles.container}>
      <View style={styles.title}>
        <FlatList style={styles.flatList} />
      </View>
      <View style={styles.form}>
        <TextInput 
        style={styles.input} 
        placeholderTextColor="#999"
        autoCorrect={true}
        placeholder="Adicione uma tarefa"
        maxLength={25}
        />
          <TouchableOpacity style={styles.button} >
          <Ionicons name="ios-add" size={24} color="white" />
          </ TouchableOpacity>
      </View>
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20
  },
  title: {
    flex: 1
  },
  form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c6cce',
    borderRadius: 4,
    marginLeft: 10
  },
  flatList:{
    flex: 1,
    marginTop: 5
  }
});
