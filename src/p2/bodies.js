'use strict';

export const indexedBodies = {};
export const bodies = [];

export const setBody = (body, options) => {
    body = {
        body,
        options
    };
    indexedBodies[body.body.id] = body;
    bodies.push(body);
};