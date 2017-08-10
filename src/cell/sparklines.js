import {atomTypes, kNorm, temperature} from '../constants';
export default Object.keys(atomTypes).map(atomType => {
    return {
        $type: "span",
        id: `sparkline-${atomType}`
    }
});

export function updateSparklines(data) {
    Object.keys(data).forEach(key => updateSparkline(data[key]));
}

function updateSparkline({kind, histogram}) {
    const theoValues = histogram.bins.map(bin => maxwellBolztmann(bin.value, kind));
    $(`#sparkline-${kind}`)
        .sparkline(histogram.values, {type: 'bar', barColor: 'red', barWidth: 20, height: 100, barColor: atomTypes[kind].color} )
        .sparkline(theoValues, {type: 'line',  barWidth: 20, width: 20 * histogram.values.length, height: 100, lineColor: atomTypes[kind].color, composite: true, fillColor: null});
}

function maxwellBolztmann(x, kind) {
    const mass = atomTypes[kind].mass;
    return Math.sqrt(Math.pow(mass / (2 * Math.PI * kNorm * temperature), 3)) * 4 * Math.PI * x * x * Math.exp(-mass * x * x / (2 * kNorm * temperature));
}