import React from 'react'
import Matter from 'matter-js'
import { View, Image  } from 'react-native'


const FootBall = props => {
    const radius = props.body.bounds.max.x - props.body.position.x


    const xBody = props.body.position.x - radius
    const yBody = props.body.position.y - radius


    const color = props.color


    return(
        <Image
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius
            }}
            source={require('./../../../../assets/images/FootBall.png')}
        />
    )
}


export default (world, color, pos, radius) => {
 
    const initialFootBall = Matter.Bodies.circle(
        pos.x,
        pos.y,
        radius,  
        {label:'FootBall'}
    )
    Matter.World.add(world, initialFootBall)


    return{
        body: initialFootBall,
        color,
        pos,
        renderer: <FootBall/>
    }
}
