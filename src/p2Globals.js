import p2 from 'p2';
import './extendP2';

export const restitutionMaterial = new p2.Material();
export const broadphase = new p2.SAPBroadphase();

export const world = new p2.World({
    broadphase,
    gravity: [0, 0]
});

world.on('postBroadphase', function (data) {
    // get collision callback
    // console.log(data.pairs);
});