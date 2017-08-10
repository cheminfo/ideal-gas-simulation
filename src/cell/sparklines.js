import {atomTypes} from '../constants';
export default Object.keys(atomTypes).map(atomType => {
    return {
        $type: "span",
        id: `sparkline-${atomType}`
    }
});

export function updateSparklines(data) {
    Object.keys(data).forEach(key => updateSparkline(data[key].kind, data[key].histogram));
}

function updateSparkline(type, data) {
    $(`#sparkline-${type}`).sparkline(data, {type: 'bar', barColor: 'red', barWidth: 20, height: 100, barColor: atomTypes[type].color} );

}