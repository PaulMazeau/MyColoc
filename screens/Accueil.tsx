import { StyleSheet, Text, View, Image } from 'react-native';
import BlueGradient from '../components/Reusable/BlueGradient';
import Header from '../components/Reusable/Header';
import { main } from '../constants/Colors';
import BoutonMiniJeu from '../components/Accueil/BoutonMiniJeux';
import MonSolde from '../components/Accueil/MonSolde';
import TacheCardAccueil from '../components/Accueil/TacheCardAccueil';
import Suggestion from '../components/Accueil/Suggestions';

const Appartement = require('../assets/Images/Appartement.png');

const AccueilScreen = () => {
  return (
    <View style={styles.container}>
      <BlueGradient/>
      <View style={styles.appartementContainer}>
        <Image source={Appartement} style={styles.AppartementImage}/>
      </View>
      <View style={styles.headerContainer}>
        <Header/>
      </View>
      <Text style={styles.TitreCategorie1}>La selection du mois</Text>
      <Suggestion />
      <View style={styles.row}>
        <MonSolde/>
        <BoutonMiniJeu/>
      </View>
      <Text style={styles.TitreCategorie1}>Ta prochaine Tâche</Text>
      <TacheCardAccueil/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 1,
  },
  appartementContainer: {
    position: "absolute",
    top: "10%",
    width: "100%",
    zIndex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  TitreCategorie1: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 10
  },
  TitreCategorie2: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  AppartementImage: {
    width: 300,
    height: 250,
  },
});

export default AccueilScreen;
