import {world} from './p2Globals';
import {height as h, width as w} from './constants';
import p2 from 'p2';
// Init canvas
export const canvas = document.getElementById("myCanvas");
canvas.width = w;
canvas.height = h;

export const ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

function drawCircle(body, shape) {
    ctx.beginPath();
    var x = body.position[0],
        y = body.position[1],
        radius = shape.radius;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawPlane(body, shape) {
    var y = body.position[1];
    ctx.moveTo(-w, y);
    ctx.lineTo(w, y);
    ctx.stroke();
}

function drawBox(body, shape) {
    var x = body.position[0];
    var y = body.position[1];
    ctx.rect(x - shape.width / 2, y - shape.height / 2, shape.width, shape.height);
    ctx.stroke();
}

function renderBodies() {
    for (let body of world.bodies) {
        for (let shape of body.shapes) {
            if (shape instanceof p2.Circle) {
                drawCircle(body, shape);
            } else if (shape instanceof p2.Plane) {
                drawPlane(body, shape);
            } else if (shape instanceof p2.Box) {
                drawBox(body, shape);
            }
        }
    }
}

export function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, w, h);

    // Transform the canvas
    // Note that we need to flip the y axis since Canvas pixel coordinates
    // goes from top to bottom, while physics does the opposite.
    ctx.save();
    // Origin is left bottom corner
    ctx.translate(w / 2, h / 2);
    ctx.scale(1, -1);

    // Draw all bodies
    renderBodies(world);

    // Restore transform
    ctx.restore();
}

