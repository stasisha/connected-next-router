import { PUSH, REPLACE, GO, PREFETCH } from './routerMethods';
export var LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export var onLocationChanged = function (location) { return ({
    type: LOCATION_CHANGE,
    payload: {
        location: location,
    }
}); };
export var CALL_ROUTER_METHOD = '@@router/CALL_ROUTER_METHOD';
export var push = function (url, as, options) { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: PUSH,
        args: [url, as, options]
    }
}); };
export var replace = function (url, as, options) { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: REPLACE,
        args: [url, as, options]
    }
}); };
export var go = function (number) { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: GO,
        args: [number]
    }
}); };
export var prefetch = function (url) { return ({
    type: CALL_ROUTER_METHOD,
    payload: {
        method: PREFETCH,
        args: [url]
    }
}); };
export var goBack = function () { return go(-1); };
export var goForward = function () { return go(1); };
export var routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward, prefetch: prefetch };
