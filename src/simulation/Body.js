import {Matrix} from 'ml-matrix';

const defaultOptions = {
    position: [0, 0],
    velocity: [0, 0],
    mass: 1
};

export default class Body {
    constructor(options) {
        options = Object.assign({}, defaultOptions, options);
        this._position = new Matrix([options.position]);
        this._velocity = new Matrix([options.velocity]);
        this._mass = options.mass;
    }

    getVelocity() {
        return this._velocity.to1DArray();
    }

    getPosition() {
        return this._position.to1DArray();
    }

    getSpeed() {
        return Math.sqrt(this.getSquaredSpeed());
    }

    getSquaredSpeed() {
        return this._velocity.dot(this._velocity);
    }

    getKineticEnergy() {
        return this._mass * this.getSquaredSpeed() / 2;
    }

    getLinearMomentum() {
        return Matrix.mul(this._velocity, this._mass);
    }

    clone() {
        return new Body(this.toJSON());
    }

    toJSON() {
        return {
            mass: this._mass,
            velocity: this._velocity.to1DArray(),
            position: this._position.to1DArray()
        }
    }
}