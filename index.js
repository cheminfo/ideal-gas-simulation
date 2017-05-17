(function () {
    // Matter.use('matter-wrap');

    const worldWidth = 800;
    const worldHeight = 600;
    
    const defaultBodyProperties = {
        frictionStatic: 0,
        restitution: 1.02,
        density: 0.01,
        frictionAir: 0,
        friction: 0,
        plugin: {
            wrap: {
                min: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: worldWidth,
                    y: worldHeight
                }
            }
        }
    };

    // create engine
    var engine = Matter.Engine.create({
            world: Matter.World.create({
                gravity: {
                    x: 0, y: 0, scale: 0.001
                }
            })
        }),
        world = engine.world;

    // create renderer
    var render = Matter.Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: worldWidth,
            height: worldHeight,
            showAngleIndicator: true
        }
    });

    Matter.Render.run(render);

    // create runner
    var runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // const bodies = createParticles(4);
    const stack = Matter.Composites.stack(50, 50, 5, 3, 100, 100, (x, y) => {
        const circle = Matter.Bodies.circle(x, y, 20, Object.assign({}, defaultBodyProperties, {
            // collisionFilter: {
            //     group: -1
            // }
        }));
        Matter.Body.setVelocity(circle, {x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 10});
        console.log(circle.restitution);
        return circle;
    });
    Matter.World.add(world, stack);

    Matter.World.add(world, [
        // walls
        Matter.Bodies.rectangle(400, 0, worldWidth, 50, Object.assign({}, defaultBodyProperties, {isStatic: true})),
        Matter.Bodies.rectangle(400, worldHeight, worldWidth, 50, Object.assign({}, defaultBodyProperties, {isStatic: true})),
        Matter.Bodies.rectangle(worldWidth, 300, 50, worldHeight, Object.assign({}, defaultBodyProperties, {isStatic: true})),
        Matter.Bodies.rectangle(0, 300, 50, worldHeight, Object.assign({}, defaultBodyProperties, {isStatic: true}))
    ]);

    // Engine.update(engine);

    // fit the render viewport to the scene
    Matter.Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: worldWidth, y: worldHeight}
    });

})();