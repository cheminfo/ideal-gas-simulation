import p2 from 'p2';
import {restitutionMaterial, world} from './p2Globals';
import {width, height} from './constants';

export function addCircle(options) {
    options = fillOptions(options);
    const circleShape = new p2.Circle({radius: options.radius});
    circleShape.material = restitutionMaterial;
    const circleBody = new p2.Body({
        mass: 1,
        ...options,
    });
    circleBody.addShape(circleShape);
    // Remove damping from the ball, so it does not lose energy
    circleBody.damping = 0;
    circleBody.angularDamping = 0;

    world.addBody(circleBody);
}

export function addPlane(options) {
    options = fillOptions(options);
    // Add a plane
    const planeShape = new p2.Plane();
    planeShape.material = restitutionMaterial;
    const planeBody = new p2.Body({
        mass: 0,
        ...options,
    });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);
}

function getRandomPosition() {
    const x = Math.random() * width;
    const y = Math.random() * height;
    return [x, y];
}

function getRandomVelocity() {
    return [Math.random() * width, Math.random() * height];
}

function fillOptions(options) {
    options = Object.assign({}, options);
    if(!options.position) {
        options.position = getRandomPosition();
    }
    if(!options.velocity) {
        options.velocity = getRandomVelocity();
    }
    return options;
}


export function grid(options, cb) {
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