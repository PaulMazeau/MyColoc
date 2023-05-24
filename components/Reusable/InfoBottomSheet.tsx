import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal} from '@gorhom/bottom-sheet';

const InfoBottomSheet = React.forwardRef<any>((props, ref) => {
    const CustomBackgroundComponent = () => (
        <View></View>
    );

    return (
        <BottomSheetModal 
            ref={ref} 
            index={1} 
            snapPoints={['25%', '50%']} 
            backgroundComponent={CustomBackgroundComponent}
            handleComponent={null}
        >
            <View style={styles.bottomSheet}>
                <Text style={styles.bottomSheetText}>AGGGGGGG</Text>
            </View>
        </BottomSheetModal>
    );
});


const styles = StyleSheet.create({
    bottomSheet: {
        flex: 1, 
        backgroundColor: 'orange', 
        margin: 16, 
        borderRadius: 35, 
        marginBottom: 16 
    },
    bottomSheetText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 12
    }
});

export default InfoBottomSheet;
