import Body from './Body';

export default function broadphase(bodies) {
    const collisionPairs = [];
    bodies = bodies.splice();
    bodies.sort(sortBodiesByX);

    // For now we do it quiet stupidly
    for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
            if(boundsOverlap(bodies[i], bodies[j])) {
                collisionPairs.push([bodies[i], bodies[j]]);
            } else {
                // because body list is sorted
                break;
            }
        }
    }
}

function canCollide(bodyA, bodyB) {
    const countKinematic = +(bodyA.type === Body.KINEMATIC) + +(bodyB.type === BODY.KINEMATIC);
    if (countKinematic === 0) return false;

    if (boundsOverlap(bodyA, bodyB)) {
        return true;
    }
    return false
}

function sortBodiesByX(a, b) {
    return a.getAABB()[0][0] - b.getAABB()[0][0];
}

function sortBodiesByY(a, b) {
    return a.getAABB()[0][1] - b.getAABB()[0][1];
}

function boundsOverlapSorted(bodyA, bodyB) {
    // we assume bodyA[0][0] < bodyB[0][0]
    const A = bodyA.getAABB();
    const B = bodyB.getAABB();
    return (A[1][0] > B[0][0]) && !isNotOverlapping(A.getYRange(), [B.getYRange]);
}

function isNotOverlapping([minA, maxA], [minB, maxB]) {
    return (maxA < minB) || maxB < minA;
}