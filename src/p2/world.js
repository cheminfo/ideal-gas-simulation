import p2 from 'p2';
import {restitutionMaterial, world} from './p2Globals';
import {width, height} from '../constants';
import {setBody} from './bodies';

const defaultCircleOptions = {
    mass: 1,
    color: 'black',
    radius: 5,
    position: 'random',
    velocity: 'random'
};

function createCircleBody(options) {
    options = fillOptions(options);
    const circleShape = new p2.Circle({radius: options.radius});
    circleShape.material = restitutionMaterial;
    const circleBody = new p2.Body({
        mass: options.mass,
        fixedRotation: true,
        ...options,
    });
    setBody(circleBody, options);
    circleBody.addShape(circleShape);
    // Remove damping from the ball, so it does not lose energy
    circleBody.damping = 0;
    circleBody.angularDamping = 0;
    return circleBody;
}

export function addCircle(options) {
    options = Object.assign({}, defaultCircleOptions, options);
    let circleBody = createCircleBody(options);
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
    const x = (Math.random() - 0.5) * 0.9 * width ;
    const y = (Math.random() - 0.5) * 0.9 * height;
    return [x, y];
}

function getRandomVelocity() {
    return [(Math.random() - 0.5) * width, (Math.random() - 0.5) * height];
}

function fillOptions(options) {
    options = Object.assign({}, options);
    if(options.position === 'random') {
        options.position = getRandomPosition();
    }
    if(options.velocity === 'random') {
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
