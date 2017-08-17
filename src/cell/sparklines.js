import {atomTypes} from '../constants';
import max from 'ml-array-max';
import min from 'ml-array-min';
import {maxwellBolzmannPDF} from '../util/maths';

let totalCount = [];
let overallTotal = 0;

export default Object.keys(atomTypes).map(atomType => {
    return {
        $type: 'span',
        id: `sparkline-${atomType}`
    }
});

export const prob = Object.keys(atomTypes).map(atomType => {
    return {
        $type: 'span',
        id: `sparkline-prob-${atomType}`
    }
});

export const reset = {
    $type: 'button',
    value: 'reset',
    $html: 'reset',
    onclick: function() {
        resetDistribution();
    }
};

export function resetDistribution() {
    totalCount = [];
    overallTotal = 0;
}

export function updateSparklines(data) {
    Object.keys(data).forEach(key => updateSparkline(data[key]));
}

function updateSparkline({kind, histogram}) {
    histogram.count.forEach((val, idx) => {
        if(!totalCount[idx]) totalCount[idx] = 0;
        totalCount[idx] += val;
        overallTotal += val;
    });

    const prob = totalCount.map(v => v / overallTotal);
    let theoValues = histogram.bins.map(bin => maxwellBolzmannPDF(bin.value, kind));
    const theoSum = theoValues.reduce((a, b) => a + b, 0);
    theoValues = theoValues.map(v => v / theoSum);
    $(`#sparkline-${kind}`)
        .sparkline(histogram.values, {type: 'bar', barWidth: 20, height: 100, barColor: atomTypes[kind].color})
        .sparkline(theoValues, {type: 'line', height: 100, lineColor: atomTypes[kind].color, composite: true, fillColor: null});

    const chartRangeMax = max([...prob, ...theoValues]);
    const chartRangeMin = min([...prob, ...theoValues]);
    $(`#sparkline-prob-${kind}`).sparkline(prob, {chartRangeClip: true, chartRangeMin, chartRangeMax ,width: 200, type: 'line', height: 100, lineColor: atomTypes[kind].color})
        .sparkline(theoValues, {chartRangeClip: true, chartRangeMin, chartRangeMax, type: 'line', height: 100, lineColor: 'blue', composite: true, fillColor: null});
}
