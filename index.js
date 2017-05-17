(function () {
    const defaultBodyProperties = {
        frictionStatic: 0,
        restitution: 1,
        density: 0.04,
        frictionAir: 0,
        friction: 1
    };
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create({
            world: World.create({
                gravity: {
                    x: 0, y: 0, scale: 0.001
                }
            })
        }),
        world = engine.world;

    console.log(world)

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    const circle = Bodies.circle(200, 190, 40, Object.assign({}, defaultBodyProperties));
    const circle1 = Bodies.circle(600, 200, 40, Object.assign({}, defaultBodyProperties));
    const bound = Matter.Bounds.create(Matter.Vertices.fromPath('1 1 799 0 800 600 0 600'));
    World.add(world, bound);
    World.addBody(world, circle);
    World.addBody(world, circle1);
    Matter.Body.applyForce(circle, {x: 200, y: 190}, {x: 1, y: 0});
    Matter.Body.applyForce(circle1, {x: 600, y: 200}, {x: -1, y: 0});

    World.add(world, [
        // walls
        Bodies.rectangle(400, 0, 800, 50, Object.assign({}, defaultBodyProperties, {isStatic: true})),
        Bodies.rectangle(400, 600, 800, 50, Object.assign({}, defaultBodyProperties, {isStatic: true})),
        Bodies.rectangle(800, 300, 50, 600, Object.assign({}, defaultBodyProperties, {isStatic: true})),
        Bodies.rectangle(0, 300, 50, 600, Object.assign({}, defaultBodyProperties, {isStatic: true}))
    ]);

    // Engine.update(engine);

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: 800, y: 600}
    });

})();