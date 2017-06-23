import p2 from 'p2';
import {restitutionMaterial, broadphase, world} from './p2Globals';
import {canvas, ctx, w, h} from './canvas';


// Add a circle
grid({x: -180, y: -180, rows: 10, columns: 10, rowGap: 30, columnGap: 30}, position => {
    addCircle(position, 5);
});
addPlane([190, -190]);
addPlane([190, -190], Math.PI / 2);
addPlane([-190, 190], Math.PI);
addPlane([-190, 190], -Math.PI / 2);

world.addContactMaterial(new p2.ContactMaterial(restitutionMaterial, restitutionMaterial, {
    restitution: 1,
    stiffness: Number.MAX_VALUE
}));

animate();


function addCircle(position, radius) {
    const circleShape = new p2.Circle({radius});
    circleShape.material = restitutionMaterial;
    const circleBody = new p2.Body({
        mass: 1,
        position: position,
        velocity: [Math.random() * 200, Math.random() * 200]
    });
    circleBody.addShape(circleShape);
    // Remove damping from the ball, so it does not lose energy
    circleBody.damping = 0;
    circleBody.angularDamping = 0;

    world.addBody(circleBody);
}

function addPlane(position, angle) {
    // Add a plane
    const planeShape = new p2.Plane();
    planeShape.material = restitutionMaterial;
    const planeBody = new p2.Body({
        position: position,
        mass: 0,
        angle: angle
    });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);
}

function drawCircle(body, shape) {
    ctx.beginPath();
    var x = body.position[0],
        y = body.position[1],
        radius = shape.radius;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawPlane(body, shape) {
    var y = body.position[1];
    ctx.moveTo(-w, y);
    ctx.lineTo(w, y);
    ctx.stroke();
}

function drawBox(body, shape) {
    var x = body.position[0];
    var y = body.position[1];
    ctx.rect(x - shape.width / 2, y - shape.height / 2, shape.width, shape.height);
    ctx.stroke();
}

function renderBodies() {
    for (let body of world.bodies) {
        for (let shape of body.shapes) {
            if (shape instanceof p2.Circle) {
                drawCircle(body, shape);
            } else if (shape instanceof p2.Plane) {
                drawPlane(body, shape);
            } else if (shape instanceof p2.Box) {
                drawBox(body, shape);
            }
        }
    }
}

function grid(options, cb) {
    const x = options.x; // (x,y) is the bottom left hand-corder of the grid
    const y = options.y;

    const rows = options.rows;
    const columns = options.columns;
    const rowGap = options.rowGap;
    const columnGap = options.columnGap;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            cb([x + j * columnGap, y + i * rowGap]);
        }
    }
}

function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, w, h);

    // Transform the canvas
    // Note that we need to flip the y axis since Canvas pixel coordinates
    // goes from top to bottom, while physics does the opposite.
    ctx.save();
    // Origin is left bottom corner
    ctx.translate(w / 2, h / 2);
    ctx.scale(1, -1);

    // Draw all bodies
    renderBodies();

    // Restore transform
    ctx.restore();
}

// Animation loop
var count = 0;

function animate() {
    count++;
    requestAnimationFrame(animate);

    // Move physics bodies forward in time
    world.step(1 / 60);
    // Render scene
    render();
}
