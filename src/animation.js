import {world} from './p2Globals';
import {render} from './canvas';

// Animation loop
let count = 0;
let stepSize = 1 / 60;
let paused = false;

export function step() {
    // Move physics bodies forward in time
    world.step(stepSize);
    // Render the current state
    render(world);
}

export function animate(force) {
    if(!force && paused) return;
    count++;
    requestAnimationFrame(animate);
    step();
}

export function pause() {
    paused = true;
}

export function resume() {
    paused = false;
}

export function setStep(size) {
    stepSize = size;
}