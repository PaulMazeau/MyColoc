import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BottomSheetModal, TouchableOpacity} from '@gorhom/bottom-sheet';
import Remboursement from '../../assets/icons/Remboursement.svg'
import { Shadows } from '../../constants/Shadow';

type RemboursementBSProps = {
    onDismiss: () => void; // Ceci est une fonction qui ne renvoie rien.
  };

const RemboursementBS = React.forwardRef<any, RemboursementBSProps>((props, ref) => {
    
 
    const BackdropComponent = () => (
        <View style={styles.backdrop} />
      );

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
            <View style={[styles.bottomSheet, Shadows.shadow]}>
                <Text style={styles.bottomSheetText}>Remboursement</Text>
                <View style={styles.remboursementContainer}>
                    <View style={styles.Rembourseur}>
                        <Image source={require('../../assets/images/icon.png')} style={styles.image} />
                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>Alexandre</Text>
                            <View style={styles.payeeContainer}>
                                <Text style={styles.subtitle}>a remboursé</Text>
                            </View>
                        </View>
                    </View>
                    <Remboursement />
                    <View style={styles.Rembourseur}>
                        <Image source={require('../../assets/images/icon.png')} style={styles.image} />
                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>Alexandre</Text>
                            <View style={styles.payeeContainer}>
                                <Text style={styles.subtitle}>a remboursé</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <Text style={styles.montantRemboursement}>28,38€</Text>
                    <View style={styles.boutonStack}>
                        <TouchableOpacity style={styles.boutonRembourser} onPress={() => props.onDismiss()}>
                            <Text style={styles.boutonTextRembourser}>Rembourser</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boutonAnnuler} onPress={() => props.onDismiss()}>
                            <Text style={styles.boutonTextAnnuler}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
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
        marginBottom: 16,
        justifyContent: 'space-between'
    },
    bottomSheetText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        marginTop: 28,
        marginLeft: 16
    },
    montantRemboursement: {
        fontSize: 80,
        textAlign: 'center'
    },
    boutonStack: {
        alignItems: 'center',
    },
    boutonRembourser :{
        width: '90%',
        backgroundColor: 'blue',
        borderRadius: 17,
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
        borderRadius: 17,
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
    bottomSection: {
        marginBottom: 16
    },
    payeeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      image: {
        height: 40,
        width: 40,
        borderRadius: 100,
      },
      leftContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 10,
      },
      title: {
        fontWeight: '600',
        fontSize: 16,
      },
      subtitle: {
        fontSize: 12,
      },
      Rembourseur:{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
      },
      remboursementContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around',  
        alignItems: 'center',
        width: '90%',
        marginHorizontal: '5%' 
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
});

export default RemboursementBS;
