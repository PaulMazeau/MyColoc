import Matter from 'matter-js'
import GolfBall from '../Components/GolfBall'
import {Hole} from '../Components/Hole';
import { Dimensions as RNDimensions } from 'react-native';
import MiddleWall from '../Components/MiddleWall';


export default (initialForce) => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world
    world.gravity.y = 0

    // Juste après la création de votre moteur, ajoutez ceci :
    Matter.Events.on(engine, 'collisionStart', (event) => {
    var pairs = event.pairs;

    // Parcours des paires de collisions
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];

        // Vérifiez si la balle de golf est impliquée dans la collision
        if (pair.bodyA.label === 'GolfBall' || pair.bodyB.label === 'GolfBall') {
            // Récupérez l'autre corps avec lequel la balle de golf a collisionné
            var otherBody = pair.bodyA.label === 'GolfBall' ? pair.bodyB : pair.bodyA;
        }
    }
});


    const { height, width } = RNDimensions.get('window');
   
    let ball = GolfBall(world, 'black', { x: width * 0.5, y: height * 0.7 }, 3);
    Matter.Body.set(ball.body, { restitution: 0.8, frictionAir : 0.025 });


    let hole = {
        position: {x: width * 0.5, y: height * 0.15},
        renderer: <Hole position={{x: width * 0.5, y: height * 0.15}}/>
    };

    let wall = MiddleWall(world, 'grey', 50);
    
    return {
        physics: { engine, world },
        GolfBall: ball,
        Hole: hole,
        MiddleWall: wall,
        initialForce: initialForce 
    }
}
