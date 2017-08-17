import {world} from './p2Globals';
import {render} from './canvas';
import {updateSparklines} from "../cell/sparklines";
import {velocityHistogram} from "./stats";
import {updateFrameRate, updateTotalEnergy} from '../cell/frameRate';

// Animation loop
let count = 0;
let stepSize = 1 / 60;
let stopped = true;
let frames = 0;
let date = Date.now();

export function step() {
    count++;
    frames++;
    // Move physics bodies forward in time
    world.step(stepSize);
    // Render the current state
    // render(world);
    updateSparklines(velocityHistogram({slots: 20, min: 0, max: 600}));
    updateTotalEnergy();

    const now = Date.now();
    if(now - date > 1000) {
        updateFrameRate(Math.round(frames / (now - date) * 1000));
        date = now;
        frames = 0;
    }
}

function animate() {
    if(stopped){
        return;
    }
    setImmediate(animate);
    // requestAnimationFrame(animate);
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
