import {addPlane, addCircle} from './p2/world';
import {resume, stop} from './p2/animation';
import './cell/cell';

// Add a circle
const nbPoints = 100;

for(let i=0; i<nbPoints; i++) {
    addCircle({
        position: 'random',
        radius: 5,
        color: 'red',
        velocity: 'random'
    });
}
addPlane({
    position: [190, -190],
    velocity: [0, 0]
});
addPlane({
    position: [190, -190],
    angle: Math.PI / 2,
    velocity: [0, 0]
});
addPlane({
    position: [-190, 190],
    angle: Math.PI,
    velocity: [0, 0]
});
addPlane({
    position: [-190, 190],
    angle: -Math.PI / 2,
    velocity: [0, 0]
});

resume();
stop();


