import {atomTypes} from '../constants';
export default Object.keys(atomTypes).map(atomType => {
    return {
        $type: "span",
        id: `sparkline-${atomType}`
    }
});

export function updateSparklines(data) {
    Object.keys(data).forEach(key => updateSparkline(data[key]));
}

function updateSparkline({kind, histogram, bins}) {
    $(`#sparkline-${kind}`)
        .sparkline(histogram.values, {type: 'bar', barColor: 'red', barWidth: 20, height: 100, barColor: atomTypes[kind].color} )
        .sparkline(histogram.values, {type: 'line',  barWidth: 20, width: 20 * histogram.values.length, height: 100, lineColor: atomTypes[kind].color, composite: true, fillColor: null});
}