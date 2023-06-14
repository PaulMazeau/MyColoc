import Matter from 'matter-js'
import FootBall from './FootBall'


export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world
    world.gravity.y = 9.81
    
    return {
        physics : {engine, world},
        FootBall : FootBall(world,'black',{x:200,y:600},50)
    }
}