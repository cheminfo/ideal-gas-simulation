export default function () {
    // axis-aligned bounding box
    this.type = 'circle';
    this.getAABB = function() {
        const position = this.body.getPosition();
        const x1 = position[0] - this.radius;
        const y1 = position[1] - this.radius;
        const x2 = position[0] + this.radius;
        const y2 = position[1] + this.radius;
        return [
            [x1, y1],
            [x2, y2]
        ]
    }
}