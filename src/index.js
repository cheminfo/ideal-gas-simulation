import {addPlane} from './p2/world';
import {addAtom} from './p2/atoms';
import {resume, stop} from './p2/animation';
import './cell/cell';

// Add a circle
const nbPoints = 5;
for(let i=0; i<nbPoints; i++) {
    addAtom({
        type: 'helium'
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


