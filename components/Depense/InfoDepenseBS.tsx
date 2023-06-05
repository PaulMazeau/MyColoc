import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';

const InfoDepenseBS = React.forwardRef<any>((props, ref) => {
    const BackdropComponent = useCallback((props) => {
        return (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        );
      }, []);

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
            backdropComponent={BackdropComponent}
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

export default InfoDepenseBS;
