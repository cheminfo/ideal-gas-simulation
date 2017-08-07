'use strict';

export const bodies = {};

export const setBody = (body, options) => {
    bodies[body.id] = {
        color: options.color
    };
};