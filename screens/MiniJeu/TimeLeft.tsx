import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { main } from '../../constants/Colors';

interface TimeProps {
    number: number;
}

const TimeLeft: React.FC<TimeProps> = ({ number}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{number}</Text>
            <Text style={styles.text}>s</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C8C9F0",
        borderRadius: 10,
        width: '20%',
        padding: 5,
        paddingLeft:10,
        paddingRight:10,
        flexDirection: 'row',
    },

    text: {
        color: main.MainColor,
        fontWeight: '600',
        fontSize: 15
    },
});

export default TimeLeft;
