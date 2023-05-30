import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { Shadows } from '../../constants/Shadow';


interface Props {
    name: string;
    onPress: (name: string) => void 
}

const CourseCard: React.FC<Props> = ({ name, onPress }) => {
  return (

    <View style={[styles.body, Shadows.shadow]}>
    <View style={styles.sousbody}>
    <TouchableOpacity onPress={() => onPress(name)}>
      <View style={styles.container}>
        <Image style={styles.categorie} source={require('../../assets/images/icon.png')}/>
        <Text style={styles.name}>Liste de course gilles</Text>
      </View>
      </TouchableOpacity>
    
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },

  name:{
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16
  },

  body: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 12
  },

  sousbody: {
    backgroundColor: 'white',
    borderRadius: 10,
  },

  categorie: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    },

  drawer: {
    borderRadius: 10
  },
});

export default CourseCard