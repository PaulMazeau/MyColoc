import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Shadows } from '../../constants/Shadow';
import { useContext, useState } from 'react';
import { CourseContext, UserContext } from '../../UserContext';
import { Colors, Drawer } from 'react-native-ui-lib';
import * as Haptics from 'expo-haptics';
import { FB_DB } from '../../firebaseconfig';
import { deleteDoc, doc } from 'firebase/firestore';

interface Props {
    name: string;
    onPress: (index: any) => void;
    index: number;
}
//index est l'index de la course en question dans la liste de toutes les courses "courses"
const CourseCard: React.FC<Props> = ({ name, onPress, index }) => {
    const [user, setUser] = useContext(UserContext)
    const[loading, setLoading] = useState(false)
    const [courses, setCourses] = useContext(CourseContext);
    const course = courses[index].data()
    const handleDelete = async () => {
        setLoading(true)
        deleteDoc(doc(FB_DB, "Colocs/"+user.colocID+"/Courses", courses[index].id)).then(()=>{setLoading(false)}).catch((err)=>{alert(err.message);setLoading(false)});
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }
    return(
        <View style={styles.body}>
        <Drawer
        rightItems={loading ? [{text: 'Loading', background: Colors.red30}]: [{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}      
        style={styles.drawer}
        >
        <View style={styles.sousbody}>
        <TouchableOpacity onPress={() => onPress(index)}>
            <View style={styles.container}>
                <Image style={styles.categorie} source={course.Image.uri ? {uri: course.Image.uri, cache:'force-cache'} : require('../../assets/images/icon.png')} />
                <Text style={styles.name}>{name}</Text>
            </View>
        </TouchableOpacity>
        </View>
    </Drawer>
    </View>
    )
}

const styles = StyleSheet.create({
    body: {
        ...Shadows.shadow,
        backgroundColor: 'white',
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 10,
        marginBottom: 12
    },
    sousbody: {
        backgroundColor: 'white',
        borderRadius: 10,
      },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        height: 60,
        borderRadius: 10,
    },
    name: {
        fontWeight: '600',
        marginLeft: 10,
        fontSize: 16
    },
    categorie: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    drawer: {
        borderRadius: 10
      },
});

export default CourseCard;
