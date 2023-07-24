import React, { useCallback, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import Remboursement from '../../assets/icons/Remboursement.svg'
import { Shadows } from '../../constants/Shadow';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FB_DB } from '../../firebaseconfig';
import { RemboursementLoadingContext, UserContext } from '../../UserContext';
import { ScrollView } from 'react-native-gesture-handler';

type RemboursementBSProps = {
    onDismiss: () => void;
    deveur : any;
    receveur: any;
    montant: any;
  };


const RemboursementBS = React.forwardRef<any, RemboursementBSProps>((props, ref) => {
    const { setLoading } = useContext(RemboursementLoadingContext);
    const [user, setUser] = useContext(UserContext)
    const handleRemboursement = async () => {
        setLoading(true)
        const entry = {
            timestamp: serverTimestamp(),
            amount: Number(props.montant),
            giverID: props.deveur.uuid,
            receiversID: [props.receveur.uuid],
            desc:'Remboursement',
            concerned: [props.deveur.uuid, props.receveur.uuid]
        }
        await addDoc(collection(FB_DB, 'Colocs/'+user.colocID+'/Transactions'), entry)
            .then(()=>{
                setTimeout(() => {
                    setLoading(false)
                }, 3000); // Attend 3 secondes avant d'appeler setLoading(false)
            })
            .catch((e)=>{
                alert(e.message);
                setLoading(false)
            })
    }
    
 
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
            snapPoints={['25%', '45%']} 
            backgroundComponent={CustomBackgroundComponent}
            handleComponent={null}
            backdropComponent={BackdropComponent}
        >
            <View style={[styles.bottomSheet, Shadows.shadow]}>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                <Text style={styles.bottomSheetText}>Remboursement</Text>
                <View style={styles.remboursementContainer}>
                    <View style={styles.Rembourseur}>
                        <Image source={props.deveur.avatarUrl ? {uri: props.deveur.avatarUrl, cache:'force-cache'} : require('../../assets/images/icon.png')} style={styles.image} />
                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{props.deveur.nom}</Text>
                        </View>
                    </View>
                    <Remboursement />
                    <View style={styles.Rembourseur}>
                        <Image source={props.receveur.avatarUrl ? {uri: props.receveur.avatarUrl, cache:'force-cache'} : require('../../assets/images/icon.png')} style={styles.image} />
                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{props.receveur.nom}</Text>  
                        </View>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <Text style={styles.montantRemboursement}>{props.montant.toFixed(2)}€</Text>
                    <View style={styles.boutonStack}>
                        <TouchableOpacity style={styles.boutonRembourser} onPress={() => {props.onDismiss(); handleRemboursement(); }}>
                            <Text style={styles.boutonTextRembourser}>Rembourser</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boutonAnnuler} onPress={() => props.onDismiss()}>
                            <Text style={styles.boutonTextAnnuler}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
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
        justifyContent: 'space-between',
    },
    bottomSheetText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        marginTop: 20,
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
