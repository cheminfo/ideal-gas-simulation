import {addCircle} from './world';
import {atomTypes} from '../constants';
export const addAtom = function(options) {
    if(atomTypes[options.type]) {
        options = Object.assign({}, options, options.type);
    }
    if(!options.radius) {
        options.radius = Math.sqrt(options.mass) * 20;
    }

    addCircle(options);
};
