"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getIn = function (state, path) {
    var result = state;
    for (var i = 0; i < path.length && !!result; ++i) {
        result = result[path[i]];
    }
    return result;
};
exports.default = getIn;
