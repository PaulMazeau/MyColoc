import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BackButton from '../../components/Reusable/BackButton';

interface ScreenTitleProps {
    title: string;
    handleGoBack?: () => void;
}

const ScreenTitle = ({ title, handleGoBack }: ScreenTitleProps) => {
    const handleTitlePress = () => {
        if (handleGoBack) {
            handleGoBack();
        }
    };

    return (
        <View style={styles.titleView}>
            <TouchableOpacity style={styles.titleTouch} onPress={handleTitlePress}>
                {handleGoBack && <BackButton />}
                <Text style={[styles.screenTitle, handleGoBack && styles.withHandleGoBack]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    withHandleGoBack: {
        marginLeft: 0,
    },
    titleView: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 10
    },
    titleTouch: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default ScreenTitle;
