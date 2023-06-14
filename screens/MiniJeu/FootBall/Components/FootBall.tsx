import React from 'react'
import Matter from 'matter-js'
import { View } from 'react-native'

const FootBall = props => {
    const radius = props.body.bounds.max.x - props.body.position.x // calculate the radius

    const xBody = props.body.position.x - radius
    const yBody = props.body.position.y - radius

    const color = props.color

    return(
        <View style={{
            borderWidth:1,
            borderColor:color,
            borderStyle:'solid',
            position:'absolute',
            left:xBody,
            top:yBody,
            width: radius * 2,  // change width to diameter
            height: radius * 2, // change height to diameter
            borderRadius: radius // add this line to render a circle
        }}/>
    )
}

export default (world, color, pos, radius) => {
  
    const initialFootBall = Matter.Bodies.circle( // use circle instead of rectangle
        pos.x,
        pos.y,
        radius,  // pass radius instead of size
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
