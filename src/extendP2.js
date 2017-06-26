const p2 = require('p2');

p2.Broadphase.prototype.hasCollisionWith = function (body) {
    var bodies = this.axisList,
        result = this.result;

    result.length = 0;

    // Update all AABBs if needed
    var l = bodies.length;
    while (l--) {
        var b = bodies[l];
        if (b.aabbNeedsUpdate) {
            b.updateAABB();
        }
    }

    if(body.aabbNeedsUpdate) {
        body.updateAABB();
    }

    // Sort the lists
    this.sortList();


    // Look through the X list
    for (var i = 0, N = bodies.length | 0; i !== N; i++) {
        var bi = bodies[i];
        if (bi === body) continue; // Ignore self

        if (p2.Broadphase.canCollide(bi, body) && this.boundingVolumeCheck(bi, body)) {
            return true;
        }
    }

    return false;
};