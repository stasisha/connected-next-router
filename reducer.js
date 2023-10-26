"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var createInitialRouterState_1 = __importDefault(require("./utils/createInitialRouterState"));
var createRouterReducer = function (structure) {
    var merge = structure.merge;
    var initialRouterState = (0, createInitialRouterState_1.default)(structure);
    var initialState = initialRouterState();
    return function routerReducer(state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case actions_1.LOCATION_CHANGE: {
                return merge(state, action.payload);
            }
            default:
                return state;
        }
    };
};
exports.default = createRouterReducer;
