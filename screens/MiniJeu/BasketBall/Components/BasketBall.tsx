import React from 'react'
import Matter from 'matter-js'
import { View, Image  } from 'react-native'


const BasketBall = props => {
    const radius = props.body.bounds.max.x - props.body.position.x


    const xBody = props.body.position.x - radius
    const yBody = props.body.position.y - radius



    return(
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius
        }}>
            <Image
            style={{
                height:'100%',
                width:'100%',
                transform: [{ rotate: `${props.angle}deg` }]
            }}
            source={require('./../../../../assets/images/BasketBall.png')}
            />
        </View>
        

    )
}


export default (world, color, pos, radius) => {
 
    const initialBasketBall = Matter.Bodies.circle(
        pos.x,
        pos.y,
        radius,  
        {label:'BasketBall'}
    )
    Matter.World.add(world, initialBasketBall)


    return{
        body: initialBasketBall,
        color,
        pos,
        angle: 0,  
        renderer: <BasketBall/>
    }
    
}


export const createBasketBall = (world, color, pos, radius) => {
 
    const initialBasketBall = Matter.Bodies.circle(
        pos.x,
        pos.y,
        radius,  
        {label:'BasketBall'}
    )
    Matter.World.add(world, initialBasketBall)


    return{
        body: initialBasketBall,
        color,
        pos,
        angle: 0,  
        renderer: <BasketBall/>
    } 
}
