import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuPlusProcheContext, ColocContext, UserContext } from '../../UserContext'
import { SafeAreaSpacerView } from 'react-native-ui-lib'
import { SafeAreaView } from 'react-native-safe-area-context'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { FB_DB } from '../../firebaseconfig'
import Guess from './Guess'
import Answer from './Answer'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function AuprocheGame() {
    const [points, setPoints] = useState(0)
    const [goodAnswer, setGoodAnswer] = useState(false)
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
    useEffect(()=>{
        const getQuestions = async () => {
            const data = await getDoc(doc(FB_DB, 'Questions', salon.questionUid))
            setQuestions(data.data().questionsReponses)
            setNumberOfQuestions(data.data().questionsReponses.length)
        }
        getQuestions();
    }, [])
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
    const computePoint = (userRes, actualRes) => {
        if(!userRes){
            return 0
        }
        const distance = Math.sqrt(Math.abs((userRes-actualRes)))
        return Math.floor(10*(1-distance/Math.max(userRes, actualRes)))
    }
    const handleAnswer = (data) => {
        const points = computePoint(Number(data), Number(questions[currQuestion].reponse))
       if(points > 5){
            setPoints((prev)=>(prev+points))
            setGoodAnswer(true)
       }
       else{setGoodAnswer(false), setPoints((prev)=>(prev+points))}
    }
    async function uploadRes(){
        const entry = {
            uuid: user.uuid,
            point: points
        }
        try {
            await updateDoc(doc(FB_DB, 'Colocs/'+user.colocID+'/Salon', 'salon'), {points: arrayUnion(entry)})
            setUploaded(true)
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
            <Guess question={questions[currQuestion].question} currQuestion={currQuestion} numberOfQuestion={numberOfQuestions} answer={handleAnswer} timeLeft={seconds}image={'data:image/jpeg;base64,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'} />
        )}else{
        return(
            <Answer reponse = {questions[currQuestion].reponse} timeLeft={seconds} goodAnswer={goodAnswer} lastQuestion={false}/>
        )}
    }if(currQuestion == numberOfQuestions-1){
        if(seconds>5){
            return(
                <Guess question={questions[currQuestion].question} currQuestion={currQuestion} numberOfQuestion={numberOfQuestions} answer={handleAnswer} timeLeft={seconds}image={'data:image/jpeg;base64,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'} />
            )}else{
                if(!uploaded){
                    uploadRes()
                }
            return(
                <Answer reponse = {questions[currQuestion].reponse} timeLeft={seconds} goodAnswer={goodAnswer} lastQuestion={true}/>
            )}
    }}
    const dataParticipants = coloc.filter(c=> salon.participants.includes(c.uuid))

  return (
  
   <SafeAreaView>{salon.points.map((c)=>{
    return(
      
        <Text key={c.uuid}>{dataParticipants.find((u)=>u.uuid==c.uuid).nom} : {c.point}</Text>
       
    )
   })}
   <TouchableOpacity onPress={()=>{handleStartNewGame()}}><Text>Commencer une nouvelle partie...</Text></TouchableOpacity>
   </SafeAreaView>
    
  )
}