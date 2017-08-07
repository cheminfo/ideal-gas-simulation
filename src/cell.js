import {stop, resume, step} from './animation';

window.el = {
    $cell: true,
    style: "font-family: Helvetica; font-size: 14px;",
    $components: [
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
    ]
};