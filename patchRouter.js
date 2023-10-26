"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = __importDefault(require("react-dom"));
var actions_1 = require("./actions");
var locationFromUrl_1 = __importDefault(require("./utils/locationFromUrl"));
var patchRouter = function (Router, store) {
    var unpatchedMethods = {
        set: Router.router.set,
    };
    Router.router.set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!unpatchedMethods.set) {
            return Promise.resolve();
        }
        return new Promise(function (resolve, reject) {
            react_dom_1.default.unstable_batchedUpdates(function () {
                unpatchedMethods.set.apply(Router.router, args).then(resolve, reject);
                store.dispatch((0, actions_1.onLocationChanged)((0, locationFromUrl_1.default)(Router.asPath)));
            });
        });
    };
    return function () {
        Router.router.set = unpatchedMethods.set;
    };
};
exports.default = patchRouter;
