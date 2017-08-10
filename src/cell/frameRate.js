import $ from 'jquery';

export default {
    $type: 'div',
    $components: [
        {
            id: 'frame-rate',
            $type: 'span',
            $html: `frameRate:`
        }
    ]
};


export function updateFrameRate(val) {
    $('#frame-rate').html(`frameRate: ${val}`);
}