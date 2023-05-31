import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/Reusable/BackButton';

interface ScreenTitleProps {
    title: string;
    shouldGoBack?: boolean;
}

const ScreenTitle = ({ title, shouldGoBack }: ScreenTitleProps) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        if (shouldGoBack) {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.titleView}>
            <TouchableOpacity style={styles.titleTouch} onPress={handleGoBack}>
                {shouldGoBack && <BackButton />}
                <Text style={[styles.screenTitle, shouldGoBack && styles.withHandleGoBack]}>{title}</Text>
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
        marginTop: 10,
    },
    titleTouch: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default ScreenTitle;
