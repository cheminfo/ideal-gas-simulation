import {addCircle} from './world';
import {atomTypes} from '../constants';
import {temperature, kNorm} from '../constants';
export const addAtom = function(options) {
    if(atomTypes[options.kind]) {
        options = Object.assign({}, options, atomTypes[options.kind]);
    }
    if(!options.radius) {
        options.radius = 1;
        // options.radius = Math.sqrt(options.mass) * 2;
    }

    if(options.mass) {
        // Randomly choose a direction
        const c = Math.random() /  Math.random();
        const vSquared =  3 * kNorm * temperature / options.mass; // v^2 = 3kT/m, but we suppress constants (scale...)
        const vx = Math.sqrt(vSquared / (1 + c * c));
        const vy = c * vx;
        options.velocity = [vx, vy];
    }

    addCircle(options);
};
