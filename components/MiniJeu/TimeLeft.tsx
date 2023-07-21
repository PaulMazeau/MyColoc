import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimeProps {
    number: number;
}

//Fonction permettant de changer les couleurs du text et du background en fonction du number
const colorChange = (num: number) => {
    let backgroundColor, textColor;

    if (num > 20) {
        backgroundColor = '#B3F296';
        textColor = '#62C435';
    } else if (num <= 20 && num > 10) {
        backgroundColor = '#FFBBA9';
        textColor = '#FD714D';
    } else {
        backgroundColor = '#FFA9A9';
        textColor = '#FC0909';
    }

    return { backgroundColor, textColor };
}

const TimeLeft: React.FC<TimeProps> = ({ number }) => {

    const { backgroundColor, textColor } = colorChange(number);

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <Text style={[styles.text, {color: textColor}]}>{number}</Text>
            <Text style={[styles.text, {color: textColor}]}>s</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width: '20%',
        padding: 5,
        paddingLeft:10,
        paddingRight:10,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },

    text: {
        fontWeight: '600',
        fontSize: 15
    },
});

export default TimeLeft;
