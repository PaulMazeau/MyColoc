import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, TouchableOpacity} from '@gorhom/bottom-sheet';
import Button from '../Reusable/ButtonColor';


const RemboursementBS = React.forwardRef<any>((props, ref) => {
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
                <Text style={styles.bottomSheetText}>Remboursement</Text>
                    <View style={styles.boutonStack}>
                        <TouchableOpacity style={styles.boutonRembourser}>
                            <Text style={styles.boutonTextRembourser}>Rembourser</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boutonAnnuler}>
                            <Text style={styles.boutonTextAnnuler}>Rembourser</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </BottomSheetModal>
    );
});


const styles = StyleSheet.create({
    bottomSheet: {
        flex: 1, 
        backgroundColor: 'white', 
        margin: 16, 
        borderRadius: 35, 
        marginBottom: 16 
    },
    bottomSheetText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 12
    },
    boutonStack: {
        alignItems: 'center',
    },
    boutonRembourser :{
        width: '90%',
        backgroundColor: 'blue',
        borderRadius: 10,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    boutonTextRembourser: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    boutonAnnuler:{
        width: '90%',
        borderRadius: 10,
        height: 48,
        borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boutonTextAnnuler: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700'
    },
});

export default RemboursementBS;
