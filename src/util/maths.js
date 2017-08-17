import {
    temperature,
    kNorm,
    atomTypes
} from '../constants';

const erf = require('compute-erf');
export function maxwellBolzmannPDF(x, kind) {
    const mass = atomTypes[kind].mass;
    return Math.sqrt(Math.pow(mass / (2 * Math.PI * kNorm * temperature), 3)) * 4 * Math.PI * x * x * Math.exp(-mass * x * x / (2 * kNorm * temperature));
}

export function maxwellBolzmannCDF(x, kind) {
    const mass = atomTypes[kind].mass;
    const a = Math.sqrt(kNorm * temperature / mass);
    return erf(x / (2 * a)) - Math.sqrt(2 / Math.PI) * (x * Math.exp(-x * x) / 2 / a / a) / a;
}

export function meanEnergy(kind) {
    return 1 / 2 * 3 * kNorm * temperature;
}

console.log(meanEnergy('helium'));