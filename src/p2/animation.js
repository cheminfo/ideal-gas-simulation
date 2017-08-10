import {world} from './p2Globals';
import {render} from './canvas';
import {updateSparklines} from "../cell/sparklines";
import {velocityHistogram} from "./stats";

// Animation loop
let count = 0;
let stepSize = 1 / 60;
let stopped = true;

export function step() {
    count++;
    // Move physics bodies forward in time
    world.step(stepSize);
    // Render the current state
    render(world);
    updateSparklines(velocityHistogram({slots: 10}));
}

function animate() {
    if(stopped){
        return;
    }
    requestAnimationFrame(animate);
    step();
}

export function stop() {
    stopped = true;
}

export function resume() {
    if(!stopped) return;
    stopped = false;
    animate();
}

export function setStep(size) {
    stepSize = size;
}

export function getCount() {
    return count;
}