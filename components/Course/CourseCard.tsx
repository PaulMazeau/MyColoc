import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Shadows } from '../../constants/Shadow';

interface Props {
    name: string;
    onPress: (name: string) => void 
}

const CourseCard: React.FC<Props> = ({ name, onPress }) => (
    <View style={styles.body}>
        <TouchableOpacity onPress={() => onPress(name)}>
            <View style={styles.container}>
                <Image style={styles.categorie} source={require('../../assets/images/icon.png')} />
                <Text style={styles.name}>{name}</Text>
            </View>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    body: {
        ...Shadows.shadow,
        backgroundColor: 'white',
        width: '90%',
        marginHorizontal: '5%',
        borderRadius: 10,
        marginBottom: 12
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
});

export default CourseCard;
