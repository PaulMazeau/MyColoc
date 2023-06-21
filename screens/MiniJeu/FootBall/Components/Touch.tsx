import Matter from 'matter-js';

const Touch = (entities, { touches }) => {
    if (!entities.physics.gameLayout) return entities;
    
    touches.filter(t => t.type === 'press').forEach(t => {
      const { locationX, locationY } = t.event;
      const bodies = Matter.Composite.allBodies(entities.physics.world);
      bodies.forEach(body => {
        if (Matter.Bounds.contains(body.bounds, { x: locationX - entities.physics.gameLayout.x, y: locationY - entities.physics.gameLayout.y })) {
          if (body.label === 'FootBall') {
            Matter.Body.applyForce(body, body.position, { x: 0, y: -0.05 });
          }
        }
      });
    });
    return entities;
  };
  
  export default Touch;
  