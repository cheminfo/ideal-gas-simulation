import Body from '../Body';
import elasticCollision from '../elasticCollision';
import {Matrix} from 'ml-matrix';

const examples = [
    {
        description: 'no angle, both have equal speeds',
        bodyA: {position: [-1, 0], velocity: [1, 0]},
        bodyB: {position: [0, 0], velocity: [-1, 0]},
        expectedA: {position: [-1, 0], velocity: [-1, 0]},
        expectedB: {position: [0, 0], velocity: [1, 0]}
    },
    {
        description: 'no angle, one body is still, the other is moving',
        bodyA: {position: [-1, 0], velocity: [1, 0]},
        bodyB: {position: [0, 0], velocity: [0, 0]},
        expectedA: {position: [-1, 0], velocity: [0, 0]},
        expectedB: {position: [0, 0], velocity: [1, 0]}
    },
    {
        description: 'no angle, equal speeds, different masses',
        bodyA: {position: [-1, 0], velocity: [1, 0], mass: 1},
        bodyB: {position: [0, 0], velocity: [-1, 0], mass: 2},
        expectedA: {position: [-1, 0], velocity: [-5 / 3, 0], mass: 1},
        expectedB: {position: [0, 0], velocity: [1 / 3, 0], mass: 2}
    }

];

describe('elastic collision', () => {
    describe('check examples', () => {
        examples.forEach(ex => {
            it(`check example: ${ex.description}`, () => {
                checkMomentum(ex, {
                    bodyA: new Body(ex.expectedA),
                    bodyB: new Body(ex.expectedB)
                });
                checkKineticEnergy(ex, {
                    bodyA: new Body(ex.expectedA),
                    bodyB: new Body(ex.expectedB)
                });

            });
        });
    });
    describe('conservation of momentum', () => {
        examples.forEach(ex => {
            it(ex.description, () => {
                checkMomentum(ex, doCollision(ex));
            });
        });
    });

    describe('conservation of energy', () => {
        examples.forEach(ex => {
            it(ex.description, () => {
                checkKineticEnergy(ex, doCollision(ex));
            });
        });
    });

    describe('velocity after collision', () => {
        examples.forEach(ex => {
            it(ex.description, () => {
                checkVelocity(ex, doCollision(ex));
            });
        });
    });
});


function doCollision(ex) {
    const bodyA = new Body(ex.bodyA);
    const bodyB = new Body(ex.bodyB);
    const [bA, bB] = elasticCollision(bodyA, bodyB);
    return {bodyA: bA, bodyB: bB};
}

function checkMomentum(ex, result) {
    const bodyA = new Body(ex.bodyA);
    const bodyB = new Body(ex.bodyB);

    // momentum and energy conservation
    const momentum = Matrix.add(bodyA.getLinearMomentum(), bodyB.getLinearMomentum()).to1DArray();
    const rMomentum = Matrix.add(result.bodyA.getLinearMomentum(), result.bodyB.getLinearMomentum()).to1DArray();
    deepCloseTo(momentum, rMomentum);
}

function checkKineticEnergy(ex, result) {
    const bodyA = new Body(ex.bodyA);
    const bodyB = new Body(ex.bodyB);
    expect(bodyA.getKineticEnergy() + bodyB.getKineticEnergy()).toBeCloseTo(result.bodyA.getKineticEnergy() + result.bodyB.getKineticEnergy())
}

function checkVelocity(ex, result) {
    const expectedA = new Body(ex.expectedA).getVelocity();
    const expectedB = new Body(ex.expectedB).getVelocity();
    deepCloseTo(result.bodyA.getVelocity(), expectedA);
    deepCloseTo(result.bodyB.getVelocity(), expectedB);
}

function deepCloseTo(arr1, arr2) {
    expect(arr1.length).toEqual(arr2.length);
    arr1.forEach((v, idx) => expect(v).toBeCloseTo(arr2[idx]));

}