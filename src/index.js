import {addPlane, addCircle, grid} from './world';
import {animate} from './animation';

// Add a circle
grid({x: -180, y: -180, rows: 10, columns: 10, rowGap: 30, columnGap: 30}, position => {
    addCircle({
        position,
        radius: 5
    });
});
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

animate();


