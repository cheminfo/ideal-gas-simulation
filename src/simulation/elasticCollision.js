import {Matrix} from 'ml-matrix';

export default function collision(A, B) {
    return getNewBodies(A, B);
}

function getCollisionDelta(body1, body2) {
    const deltaPos1 = Matrix.sub(body1._position, body2._position);
    const deltaPos2 = Matrix.sub(body2._position, body1._position);
    const deltaV1 = Matrix.sub(body1._velocity, body2._velocity);
    const deltaV2 = Matrix.sub(body2._velocity, body1._velocity);
    const deltaPosNorm = deltaPos1.dot(deltaPos1);

    return [
        Matrix.mul(deltaPos1, 2 * body2._mass / (body1._mass + body2._mass) * deltaV1.dot(deltaPos1) / deltaPosNorm),
        Matrix.mul(deltaPos2, 2 * body1._mass / (body1._mass + body2._mass) * deltaV2.dot(deltaPos2) / deltaPosNorm)
    ];
}

function getNewVelocities(body1, body2) {
    const [delta1, delta2] = getCollisionDelta(body1, body2);
    return [
        Matrix.sub(body1._velocity, delta1),
        Matrix.sub(body2._velocity, delta2)
    ];
}

function getNewBodies(body1, body2) {
    const [v1, v2] = getNewVelocities(body1, body2);
    const [b1, b2] = [body1.clone(), body2.clone()];
    b1._velocity = v1;
    b2._velocity = v2;
    return [b1, b2];
}