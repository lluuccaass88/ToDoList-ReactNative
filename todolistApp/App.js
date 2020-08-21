import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Plataform, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 

export default function App() {
  const [task, setTask] = useState([])
  const [newTask, setNewTask] = useState() //Sempre vai receber o valor do input


  async function addTask(){
    if(verification() == true){
      setTask([...task ,newTask])
      setNewTask('')
  
      Keyboard.dismiss()
    }else{
      return;
    }
    
  }


  function verification(){
    const search = task.filter(task => task === newTask)

    if(search.length !== 0){
      Alert.alert("Atenção", "Nome da tarefa repetido!!!")
      return false
    }

    if( newTask === ""){
      Alert.alert("Atenção", "Digite uma palavra!!!")
      return false
    }
  
  return true

  }

  async function removeTask(item){
    Alert.alert(
      "Deletar task",
      "Deseja mesmo deletar esta tarefa?",
      [
        {
          text: "Não",
          onPress:() => {
            return;
          },
          style: 'cancel'
        },
        {
          text: "Sim",
          onPress:() => {setTask(task.filter(tasks => tasks !== item))},
        }
      ],
      {cancelable: false}
    )
    

  }

  useEffect(() => {
    async function loadData(){
      const task = await AsyncStorage.getItem("task")

      if(task){
        setTask(JSON.parse(task));
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    async function saveData(){
      AsyncStorage.setItem("task", JSON.stringify(task))
    }
    saveData()
  }, [task])
  
  
  
  return (
  <>
    <View style={styles.container}>
      <View style={styles.title}>
        <FlatList
        style={styles.flatList} 
        data={task}
        keyExtractor={item => item.toString() }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.ContainerView}> 
            <Text style={styles.texto} > {item} </Text>
            <TouchableOpacity onPress={() => removeTask(item)}>
              <MaterialIcons name='delete-forever' size={25} color="#f64c75" />
            </TouchableOpacity>
          </View>
          )}
        />
      </View>
      <View style={styles.form}>
        <TextInput 
        style={styles.input} 
        placeholderTextColor="#f7fdff"
        autoCorrect={true}
        placeholder="Adicione uma tarefa"
        maxLength={40}
        onChangeText={text => setNewTask(text)}
        value={newTask}
        />
          <TouchableOpacity style={styles.button} onPress={() => addTask()} >
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
    backgroundColor: '#4e0091',
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
    backgroundColor: '#006f91',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#007da3'
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d47502',
    borderRadius: 4,
    marginLeft: 10
  },
  flatList:{
    flex: 1,
    marginTop: 5,
    color: 'white'
  },
  ContainerView: {
    marginBottom: 15, 
    padding: 15, 
    borderRadius: 4,
    backgroundColor: "#eee",

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
  },
  texto: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center'
  }
});
