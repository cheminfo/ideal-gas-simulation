import {addCircle} from './world';
import {atomTypes} from '../constants';
import {temperature, kNorm} from '../constants';
export const addAtom = function(options) {
    if(atomTypes[options.kind]) {
        options = Object.assign({}, options, atomTypes[options.kind]);
    }
    if(!options.radius) {
        options.radius = 6;
        // options.radius = Math.sqrt(options.mass) * 2;
    }

    if(options.mass) {
        // Randomly choose a direction
        const v =  Math.sqrt(3 * kNorm * temperature / options.mass); // v^2 = 3kT/m, but we suppress constants (scale...)
        const angle = Math.random() * 2 * Math.PI;
        options.velocity = [v * Math.cos(angle), v * Math.sin(angle)];
    }

    addCircle(options);
};


function randomSign() {
    return Math.random() - 0.5 > 0 ? 1 : -1
}