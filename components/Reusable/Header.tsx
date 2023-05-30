import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../../assets/icons/Settings.svg';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../UserContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams, SettingsStackParams } from '../../App';

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParams, 'SettingsStack'>;

const Header = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [user, setUser] = useContext(UserContext);
    const handleSettingsPress = () => {
        navigation.navigate('SettingsStack', { screen: 'UserSettings' });
      };
    

    const handleColocSettingsPress = () => {
        navigation.navigate('SettingsStack', { screen: 'ColocationSettings' });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleSettingsPress} style={styles.globalLeft}>
                    <View style={styles.imageContainer}>
                        <Image source={user.avatarUrl ? {uri: user.avatarUrl, cache:'force-cache'} : require('../../assets/images/icon.png')} style={styles.image}/>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.bigTitle}>{user.nom}</Text>
                        <Text style={styles.smallTitle}>{user.nomColoc}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleColocSettingsPress}>
                    <Settings width={25} height={25} fill="#282828"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#00000000', 
        paddingBottom: Platform.OS === 'android' ? 25 : -25
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    },
    globalLeft: {
        flexDirection: 'row',
    },
    title: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    bigTitle: {
        fontSize: 16
    },
    smallTitle: {
        fontSize: 12,
        opacity: 0.6,
    },
    imageContainer: {
        height: 40,
        width: 40,
        overflow: 'hidden',
        borderRadius: 7,
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default Header;
