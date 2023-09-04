import { View, Text, ActivityIndicator, ImageBackground, StyleSheet, Image} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuPlusProcheContext, ColocContext, UserContext } from '../../UserContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { FB_DB } from '../../firebaseconfig'
import Guess from './Guess'
import Answer from './Answer'
import { StatusBar } from 'expo-status-bar'
import Button from '../Reusable/ButtonColor'
import Trophy from '../../assets/icons/Trophy.svg';

const Space_Background=require('../../assets/images/Space_Background.png');
const Logo =require('../../assets/images/Logo_Minijeu.png');

export default function AuprocheGame() {
    const [points, setPoints] = useState([])
    const [user, setUser] = useContext(UserContext)
    const [questions, setQuestions] = useState(null)
    const [currQuestion, setCurrQuestion] = useState(-1) // pq -1 ? car lorsque seconde =15 on incrémente de 1, donc dès le début du timer currQuestion vaut 0 (ce qu'on veut). On pourrait start à 0 et update à 0sec MAIS cela laisse la seconde entre 0 et le nouveau 15 dans l'état ou currQuestion vaut 1 de plus que ce qu'elle devrait à cet instant.
    const [numberOfQuestions, setNumberOfQuestions] = useState(null)
    const [seconds, setSeconds] = useState(15)
    const [salon, setSalon] = useContext(AuPlusProcheContext)
    const [coloc, setColoc] = useContext(ColocContext)
    const [uploaded, setUploaded] = useState(false)
    const resUid = salon.points.map((c)=>c.uuid)
    const userPlayed = resUid.includes(user.uuid)
    
    useEffect(() => {
        const fetchData = async () => {
          const randomIndex = Math.floor(Math.random() * 17) + 1;  // Génère un nombre entre 1 et 17
          const randomLotId = `${randomIndex}`;  // Assurez-vous que vos IDs suivent cette séquence
          const docRef = doc(FB_DB, "Questions", randomLotId);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            const data = docSnap.data();
            setQuestions(data.questions);
            setNumberOfQuestions(data.questions.length);
          } else {
            console.log("No such document!");
          }
        };
        fetchData();
      }, []);

    useEffect(() => {
        const intervalId = setInterval(() => { //timer
          setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 15));
        }, 1000);
        if(seconds==15){
            setCurrQuestion((prev)=>(prev+1))
        }
        return () => {
          clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
      }, [seconds]);

    useEffect(()=>{
        if(uploaded){
            setTimeout(uploadRes, 4000)
        }
    }, [uploaded])
    const handleAnswer = (data) => {
        setPoints((prev) => [...prev, Number(data)])
    }
    async function uploadRes(){
        const entry = {
            uuid: user.uuid,
            point: points
        }
        try {
            await updateDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), {points: arrayUnion(entry)})
        } catch (error) {
            alert(error.message)
        }
    }

    async function handleStartNewGame() {
        try {
            await updateDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), {started : false, points: []})
        } catch (error) {
            alert(error.message)
        }
    }
    if(!questions){
        return(
            <ActivityIndicator size='large'/>
        )
    }
    if(!userPlayed){
    if(currQuestion<numberOfQuestions-1){
        if(seconds>5){
        return(
            <Guess question={questions[currQuestion].question} currQuestion={currQuestion} numberOfQuestion={numberOfQuestions} answer={handleAnswer} timeLeft={seconds} image={questions[currQuestion].imgUrl} />
        )}else{
        return(
            <Answer reponse = {questions[currQuestion].reponse} timeLeft={seconds}  lastQuestion={false} />
        )}
    }if(currQuestion == numberOfQuestions-1){
        if(seconds>5){
            return(
                <Guess question={questions[currQuestion].question} currQuestion={currQuestion} numberOfQuestion={numberOfQuestions} answer={handleAnswer} timeLeft={seconds} image={questions[currQuestion].imgUrl} />
            )}
                if(!uploaded){
                   setUploaded(true)
                }
            return(
                <Answer reponse = {questions[currQuestion].reponse}  timeLeft={seconds}  lastQuestion={true}/>
            )
    }}
    const dataParticipants = coloc.filter(c=> salon.participants.includes(c.uuid))
    const computePoints = () => {
        const userPoints = {}; // {uuid: points}
        const allAnswers = salon.points;

        for (let i = 0; i < questions.length; i++) {
            const actualAnswer = questions[i].reponse;

            const allDistancesToActualAnswer = allAnswers.map((ans) => {
                return {
                    uuid: ans.uuid,
                    distance: Math.abs(Number(actualAnswer) - Number(ans.point[i]))
                };
            });

            allDistancesToActualAnswer.sort((a, b) => a.distance - b.distance);

            allDistancesToActualAnswer.forEach((distObj, index) => {
                if (distObj.distance === 0) {
                    userPoints[distObj.uuid] = (userPoints[distObj.uuid] || 0) + 2;
                } else if (index === 0) {
                    userPoints[distObj.uuid] = (userPoints[distObj.uuid] || 0) + 1;
                }
            });
        }
        return userPoints;
    }

    // Appelez computePoints pour obtenir les points calculés pour tous les utilisateurs
    const calculatedPoints = computePoints();
    const sortedPoints = salon.points.sort((a, b) => {
        return (calculatedPoints[b.uuid] || 0) - (calculatedPoints[a.uuid] || 0);
    });

    return (
        <ImageBackground 
            source={Space_Background} 
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.global} edges={['top']}>
                <StatusBar style="light" />
                <View style={styles.logo}>
                    <Image source={Logo} />
                </View>
                <View style={styles.title}>
                    <Trophy width={30} height={30} />
                    <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 8, marginBottom: 20}}>Classement</Text>
                </View>
                <View style={styles.classement}>
                {sortedPoints.map((c, index) => {
                    const user = dataParticipants.find((u) => u.uuid === c.uuid);
                    return (
                        <View key={c.uuid}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image 
                                    source={{ uri: user.avatarUrl }} 
                                    style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} 
                                />
                                <Text style={styles.text}>{user.nom} : {calculatedPoints[c.uuid] || 0}</Text>
                            </View>
                            {index !== sortedPoints.length - 1 && 
                                <View style={{ height: 1, backgroundColor: 'white', marginVertical: 12 }} />
                            }
                        </View>
                    );
                })}
                </View>
                <View style={{width: '90%', marginHorizontal: '5%'}}>
                    <Button text={'Commencer une nouvelle partie'} onPress={() => { handleStartNewGame() }} colorBackGround={'#5368F9'} colorText={'white'} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
    global: {
        flex:1,
        width:'100%',
   
    },

    imageBackground: {
        flex: 1,             
        width: '100%',       
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo:{
        margin:10,
        alignItems:'center'
      },

    title: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        width: '90%',
    },

    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },

    classement: {
        marginHorizontal: '5%',
        width: '90%',
        height: 'auto',
        backgroundColor: '#5368F9',
        borderRadius: 12,
        padding: 12,
        marginBottom: 20
    }
})