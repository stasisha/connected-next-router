"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerActions = exports.goForward = exports.goBack = exports.prefetch = exports.go = exports.replace = exports.push = exports.CALL_ROUTER_METHOD = exports.onLocationChanged = exports.LOCATION_CHANGE = void 0;
var routerMethods_1 = require("./routerMethods");
exports.LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
var onLocationChanged = function (location) { return ({
    type: exports.LOCATION_CHANGE,
    payload: {
        location: location,
    }
}); };
exports.onLocationChanged = onLocationChanged;
exports.CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD';
var push = function (url, as, options) { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.PUSH,
        args: [url, as, options]
    }
}); };
exports.push = push;
var replace = function (url, as, options) { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.REPLACE,
        args: [url, as, options]
    }
}); };
exports.replace = replace;
var go = function (number) { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.GO,
        args: [number]
    }
}); };
exports.go = go;
var prefetch = function (url) { return ({
    type: exports.CALL_ROUTER_METHOD,
    payload: {
        method: routerMethods_1.PREFETCH,
        args: [url]
    }
}); };
exports.prefetch = prefetch;
var goBack = function () { return (0, exports.go)(-1); };
exports.goBack = goBack;
var goForward = function () { return (0, exports.go)(1); };
exports.goForward = goForward;
exports.routerActions = { push: exports.push, replace: exports.replace, go: exports.go, goBack: exports.goBack, goForward: exports.goForward, prefetch: exports.prefetch };
