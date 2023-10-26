"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var locationFromUrl_1 = __importDefault(require("./locationFromUrl"));
var createInitialRouterState = function (_a) {
    var fromJS = _a.fromJS;
    return function (url) {
        if (url === void 0) { url = '/'; }
        var initialState = {
            location: (0, locationFromUrl_1.default)(url),
        };
        return fromJS(initialState);
    };
};
exports.default = createInitialRouterState;
