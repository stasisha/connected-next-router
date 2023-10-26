"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("next/router"));
var routerMethods_1 = require("./routerMethods");
var actions_1 = require("./actions");
var locationFromUrl_1 = __importDefault(require("./utils/locationFromUrl"));
var createRouterMiddleware = function (structure) { return function (middlewareOpts) {
    var _a;
    if (middlewareOpts === void 0) { middlewareOpts = {}; }
    var _b = middlewareOpts.Router, Router = _b === void 0 ? router_1.default : _b, _c = middlewareOpts.methods, methods = _c === void 0 ? {} : _c, _d = middlewareOpts.reducerKey, reducerKey = _d === void 0 ? 'router' : _d;
    var routerMethodsArr = [routerMethods_1.PUSH, routerMethods_1.PREFETCH, routerMethods_1.REPLACE];
    var resolvedMethods = routerMethodsArr.reduce(function (acc, method) {
        acc[method] = methods[method] ? methods[method] : method;
        return acc;
    }, (_a = {}, _a[routerMethods_1.GO] = routerMethods_1.GO, _a));
    return function (store) { return function (next) { return function (action) {
        var _a;
        var type = action.type;
        var isServer = typeof window === 'undefined';
        if (Router && !isServer && type !== actions_1.LOCATION_CHANGE) {
            var storeLocation = structure.getIn(store.getState(), [reducerKey, 'location']);
            if (Router.asPath !== storeLocation.href) {
                next((0, actions_1.onLocationChanged)((0, locationFromUrl_1.default)(Router.asPath)));
            }
        }
        if (type === actions_1.CALL_ROUTER_METHOD) {
            var _b = action.payload, args = _b.args, payloadMethod = _b.method;
            var method = resolvedMethods[payloadMethod];
            if (method === routerMethods_1.GO && !isServer && typeof args[0] === 'number') {
                window.history.go(args[0]);
            }
            else if (method && Object.prototype.hasOwnProperty.call(Router, method)) {
                (_a = Router)[method].apply(_a, args);
            }
            else if (process.env.NODE_ENV === 'development') {
                throw new Error("Router method \"".concat(method, "\" for ").concat(payloadMethod, " action does not exist"));
            }
        }
        else {
            return next(action);
        }
    }; }; };
}; };
exports.default = createRouterMiddleware;
