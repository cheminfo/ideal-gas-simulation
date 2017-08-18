import {Matrix} from 'ml-matrix';
import {createShape} from './shapes/shapes';

const defaultOptions = {
    position: [0, 0],
    velocity: [0, 0],
    mass: 1,
    type: Body.KINEMATIC
};

export default class Body {
    constructor(options) {
        options = Object.assign({}, defaultOptions, options);
        this._position = new Matrix([options.position]);
        this._velocity = new Matrix([options.velocity]);
        this._mass = options.mass;
        this._type = options.type;
        this.shapes = [];
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
            type: this._type,
            mass: this._mass,
            velocity: this._velocity.to1DArray(),
            position: this._position.to1DArray()
        }
    }

    getAABB() {
        if(this.shape) {
            return this.shape.getAABB();
        } else {
            const position = this._position.to1DArray();
            return [position, position.slice()];
        }

    }

    setShape(type, options) {
        this.shape = createShape(type, this, options);
    }

}

Body.STATIC = 0;
Body.DYNAMIC = 1;