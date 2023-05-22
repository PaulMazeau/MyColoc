
import { View, Text, StyleSheet } from 'react-native';


const Score = () => {
    return(
        <View style = {styles.container}>
            <Text style = {styles.text}> 1800</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        backgroundColor : "white",
        borderRadius : 10,
        width : '20%',
        padding : 2,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection:'row'
    },

    text : {
        color : "#978AF1",
        fontWeight : '600',
        fontSize : 15,
    }
})

export default Score;