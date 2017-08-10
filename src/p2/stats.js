// compute stats on objects

import {bodies} from './bodies';
import groupBy from 'lodash.groupby';
import {atomTypes} from '../constants';
import mlmin from 'ml-array-min';
import mlmax from 'ml-array-max';

export function velocityHistogram(options) {
    if (options.type) {
        throw new Error('to be implemented...');
    } else {
        const grouped = groupBy(bodies, body => body.options.kind);
        return Object.keys(
            grouped
        ).map(kind => {
            return {
                kind: kind,
                histogram: doHistogram(grouped[kind].map(body => rootSquare(body.body.velocity)), options),
                color: atomTypes[kind].color
            }
        });
    }
}

function doHistogram(values, options) {
    const slots = Array.from({length: options.slots}).fill(0);
    const bins = Array.from({length: options.slots}).map(() => ({}));
    const [min, max] = [mlmin(values), mlmax(values)];
    const width = max - min;
    const binWidth = width / options.slots;
    bins.forEach((bin, idx) => {
        bin.min = min + idx * binWidth;
        bin.max = bin.min + binWidth;
        bin.value = bin.min + (bin.max - bin.min) / 2;
    });
    for (const value of values) {
        if(value === max) {
            slots[options.slots-1]++;
            continue;
        }
        const slot = Math.floor((value - min) / binWidth);
        slots[slot]++;
    }

    return {
        values: slots.map(slot => slot / values.length),
        bins
    };
}

function rootSquare(x) {
    return Math.sqrt(x[0] * x[0] + x[1] * x[1]);
}