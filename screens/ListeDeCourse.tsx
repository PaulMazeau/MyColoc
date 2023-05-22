import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParams } from '../App';
import BackButton from '../components/BackButton';
import CourseCard from '../components/CourseCard';
import Header from '../components/Header';

// Définition du type des propriétés pour le composant ListeDeCourseScreen
type Props = NativeStackScreenProps<RootStackParams, 'ListeDeCourse'>;

const ListeDeCourseScreen = ({route, navigation}: Props) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header/>
      <BackButton/>
      <Text>Ceci est la liste de course {route.params.name}</Text>
      <Text>Exemple de navigation imbriqué</Text>
      <CourseCard name="Course de Paul" onPress={ () => navigation.push('ListeDeCourse', {name: "Course de Paul"})}/>
      <CourseCard name="Course de WIlk" onPress={ () => navigation.push('ListeDeCourse', {name: "Course de Wilk"})}/>
      <CourseCard name="Course de Ariel" onPress={ () => navigation.push('ListeDeCourse', {name: "Course de Ariel "})}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ListeDeCourseScreen