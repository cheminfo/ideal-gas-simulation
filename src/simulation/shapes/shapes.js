import asCircle from './mixins/circle';

function Circle(body, radius) {
    this.body = body;
    this.radius = radius;
}

asCircle.call(Circle.prototype);

const shapes = [Circle];

export function createShape(type, body, options) {
    const Shape = shapes.find(s => s.prototype.type === type);
    if(!Shape) {
        throw new Error(`Invalid shape type ${type}`);
    }
    return new Shape(body, options);
}
