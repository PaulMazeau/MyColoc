import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import Header from '../components/Reusable/Header';
import { StatusBar } from 'expo-status-bar';
import Valider from '../assets/icons/Valider';
import { main } from '../constants/Colors';
import { Shadows } from '../constants/Shadow';
import BackIcon from '../components/Reusable/BackButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import ScreenTitle from '../components/Reusable/ScreenTitle';
import { CourseContext, UserContext } from '../UserContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { FB_APP, FB_DB } from '../firebaseconfig';

// Définition du type des propriétés pour le composant ListeDeCourseScreen
type Props = NativeStackScreenProps<RootStackParams, 'ListeDeCourse'>;

type Todo = {
  id: string;
  title: string;
  completed?: boolean;
};

const initialTodos: Todo[] = [
  { id: '1', title: 'Tarte' },
  { id: '2', title: 'Pomme de terre' },
  { id: '3', title: 'aliments' },
];

//route.params.index est l'index de la course dans toutes les listes de courses
const TodoList = ({route, navigation}: Props) => {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState('');
  const [courses, setCourses] = useContext(CourseContext);
  const [user, setUser] = useContext(UserContext)
  const course = courses[route.params.index].data();
  const courseId = courses[route.params.index].id
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  const isScrollEnabled = todos.length > 15; // nombre d'élément avant un scroll

  const addTodo = () => {
    if (input.length > 0) {
      setTodos([...todos, { id: Math.random().toString(36).substring(7), title: input }]);
      setInput('');
    }
  };

  const handleAddInput = async () => {
    if(input.length != 0){
      await updateDoc(doc(FB_DB, "Colocs/"+user.colocID+"/Courses", courseId), {divers: arrayUnion({item: input, selected: false})}).then(()=>{
        setInput('')
      }).catch((error)=>{alert(error.message)})
    }
  }
  return (
    <View style={styles.body}>
      <Header/>
      <StatusBar style="auto" />
      <TouchableOpacity style={{flexDirection: 'row'}}  onPress={() => {navigation.goBack() }}>
        
        <ScreenTitle title={course.Nom} shouldGoBack/>
        </TouchableOpacity>
      <View style={[styles.container, Shadows.shadow]}>
        <KeyboardAwareFlatList
          data={course.divers}
          keyExtractor={item => item.item}
          scrollEnabled={true} 
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <View style={[styles.item, item.selected && styles.completedItem]}>
                <View style={[styles.checkbox, item.selected && styles.completedCheckbox]}>
                  <Valider color="white" width={14} height={14}/>
                </View>
                <Text style={[styles.itemText, item.selected && styles.completedText]}>{item.item}</Text>
              </View>
            </TouchableOpacity>
          )}
          
          ListFooterComponent={
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleAddInput}
              placeholder="Ajouter un nouvel élément..."
              returnKeyType="next"
              blurOnSubmit={false}
            />
          }
          extraScrollHeight={Platform.OS === 'ios' ? 120 : 100}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: main.BgColor  
  },
  container: {
    height: "auto",
    backgroundColor: "white",
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 10,
    padding: 10,
  },
  listContainer: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    marginBottom: 2
  },
  completedItem: {
    backgroundColor: '#f0f0f0',
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#172ACE',
    borderRadius: 4,
    padding: 4,
  },
  completedCheckbox: {
    backgroundColor: '#172ACE',
  },
  itemText: {
    fontSize: 18,
  },
  completedText: {
    color: "#8D8D8D",
    opacity: 0.8,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',  
    paddingHorizontal: 15,  
    paddingVertical: 10,  
    fontSize: 18,  
    color: '#000',
  },
});

export default TodoList;
