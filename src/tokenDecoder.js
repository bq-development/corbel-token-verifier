'use strict';

/*
    A b64 serializer, for node v6.0.0
 */
function serialize(b64){
    return new Buffer(b64, 'base64').toString('utf-8');
}

/*
    The token decoder
 */
function decoder (assertion) {
    var decoded = assertion.split('.');

    try {
        decoded[0] = JSON.parse(serialize(decoded[0]));
    } catch (e) {
        decoded[0] = false;
    }

    try {
        decoded[1] = JSON.parse(serialize(decoded[1]));
        decoded[0] = Object.assign({}, decoded[0], decoded[1]);
    } catch (e) {
        
        decoded[1] = parseInt(parseInt(decoded[1], 16) / 1000, 10);
    }

    if (!decoded[0] && !decoded[1]) {
        return false;
    }

    return {
        info: decoded[0],
        expire: decoded[1],
        signature: decoded[2]
    }
}

module.exports = decoder;