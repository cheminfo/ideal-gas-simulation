import $ from 'jquery';
import {getMeanEnergy} from "../p2/stats";
export default {
    $type: 'div',
    $components: [
        {
            id: 'frame-rate',
            $type: 'span',
            $html: `frameRate:`
        },
        {
            id: 'total-energy',
            $type: 'span',
            $html: `total energy:`
        }
    ]
};


export function updateFrameRate(val) {
    $('#frame-rate').html(`frameRate: ${val}`);
}

export function updateTotalEnergy() {
    $('#total-energy').html(`total energy: ${getMeanEnergy()}`);
}