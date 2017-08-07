import {world} from './p2Globals';
import {render} from './canvas';

// Animation loop
let count = 0;
let stepSize = 1 / 60;
let stopped = false;

export function step() {
    // Move physics bodies forward in time
    world.step(stepSize);
    // Render the current state
    render(world);
}

function animate() {
    if(stopped){
        return;
    }
    count++;
    requestAnimationFrame(animate);
    step();
}

export function stop() {
    stopped = true;
}

export function resume() {
    stopped = false;
    animate();
}

export function setStep(size) {
    stepSize = size;
}