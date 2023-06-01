import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { main } from '../../constants/Colors';

interface QuestionProps {
    number: number;
    total: number;
}

const QuestionNumber: React.FC<QuestionProps> = ({ number, total }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Question </Text>
            <Text style={styles.text}>{number}</Text>
            <Text style={styles.text}>/</Text>
            <Text style={styles.text}>{total}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C8C9F0",
        borderRadius: 10,
        width: '35%',
        padding: 5,
        paddingLeft:10,
        paddingRight:10,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },

    text: {
        color: main.MainColor,
        fontWeight: '600',
        fontSize: 15
    },
});

export default QuestionNumber;
