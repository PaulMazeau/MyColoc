import { View, Text, StyleSheet, } from "react-native";
import { MiniJeu } from '../../constants/Colors';


const PlayButton = () => {

    return (
        <View style={styles.global}>
            <Text style ={styles.text}>Jouer</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    global:{
        backgroundColor : "white",
        borderRadius : 10,
        height : '15%',
        justifyContent : 'center',
        alignItems : 'center'
    },

    text:{
        fontWeight: '600',
        color : MiniJeu.TextColor1
    }

})

export default PlayButton