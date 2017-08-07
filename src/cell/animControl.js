import {stop, resume, step} from '../p2/animation';

export default [
    {
        $type: "input",
        type: "button",
        value: "stop",
        onclick: function() {
            stop();
        }
    },
    {
        $type: "input",
        type: "button",
        value: "resume",
        onclick: function() {
            resume();
        }
    },
    {
        $type: "input",
        type: "button",
        value: "step",
        onclick: function() {
            step();
        }
    },
];