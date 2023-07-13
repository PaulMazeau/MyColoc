import React from 'react'
import Matter from 'matter-js'
import { View, Image  } from 'react-native'


const GolfBall = props => {
    const radius = props.body.bounds.max.x - props.body.position.x


    const xBody = props.body.position.x - radius
    const yBody = props.body.position.y - radius



    return(
        <View style={{
            position: 'absolute',
            left: xBody ,
            top: yBody,
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            //backgroundColor:'black',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Image
            style={{
                height: props.size ? props.size : 120,
                width: props.size ? props.size : 120,
                transform: [{ rotate: `${props.angle}deg` }]
            }}
            source={require('./../../../../assets/images/GolfBall.png')}
            />
        </View>
        

    )
}


export default (world, color, pos, radius) => {
 
    const initialGolfBall = Matter.Bodies.circle(
        pos.x,
        pos.y,
        radius,  
        {label:'GolfBall'}
    )
    Matter.World.add(world, initialGolfBall)


    return{
        body: initialGolfBall,
        color,
        pos,
        angle: 0,
        size:120,  
        renderer: <GolfBall/>
    }
    
}


export const createGolfBall = (world, color, pos, radius) => {
 
    const initialGolfBall = Matter.Bodies.circle(
        pos.x,
        pos.y,
        radius,  
        {label:'GolfBall'}
    )
    Matter.World.add(world, initialGolfBall)


    return{
        body: initialGolfBall,
        color,
        pos,
        angle: 0,  
        size:120,
        renderer: <GolfBall/>
    } 
}
