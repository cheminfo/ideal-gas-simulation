import {addPlane} from './p2/world';
import {addAtom} from './p2/atoms';
import {resume, stop} from './p2/animation';
import {width, height} from "./constants"
import './cell/cell';

// Add a circle
const nbPoints = 100;
for(let i=0; i<nbPoints; i++) {
    addAtom({kind: 'helium'});
    addAtom({kind: 'neon'});
    // addAtom({kind: 'argon'});
    // addAtom({kind: 'krypton'});
    // addAtom({kind: 'xenon'});

}
addPlane({
    position: [width / 2, -height / 2],
    velocity: [0, 0]
});
addPlane({
    position: [width / 2, -height / 2],
    angle: Math.PI / 2,
    velocity: [0, 0]
});
addPlane({
    position: [- width / 2, height / 2],
    angle: Math.PI,
    velocity: [0, 0]
});
addPlane({
    position: [- width / 2, height / 2],
    angle: -Math.PI / 2,
    velocity: [0, 0]
});

resume();
stop();


