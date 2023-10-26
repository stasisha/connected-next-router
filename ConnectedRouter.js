"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var router_1 = __importDefault(require("next/router"));
var actions_1 = require("./actions");
var locationFromUrl_1 = __importDefault(require("./utils/locationFromUrl"));
var patchRouter_1 = __importDefault(require("./patchRouter"));
var createConnectedRouter = function (structure) {
    var getIn = structure.getIn;
    var ConnectedRouter = function (props) {
        var Router = props.Router || router_1.default;
        var _a = props.reducerKey, reducerKey = _a === void 0 ? 'router' : _a;
        var store = (0, react_redux_1.useStore)();
        var ongoingRouteChanges = (0, react_1.useRef)(0);
        var isTimeTravelEnabled = (0, react_1.useRef)(true);
        var inTimeTravelling = (0, react_1.useRef)(false);
        function trackRouteComplete() {
            isTimeTravelEnabled.current = --ongoingRouteChanges.current <= 0;
        }
        function trackRouteStart() {
            isTimeTravelEnabled.current = ++ongoingRouteChanges.current <= 0;
        }
        (0, react_1.useEffect)(function () {
            function listenStoreChanges() {
                if (!isTimeTravelEnabled.current) {
                    return;
                }
                var storeLocation = getIn(store.getState(), [reducerKey, 'location']);
                var pathnameInStore = storeLocation.pathname, searchInStore = storeLocation.search, hashInStore = storeLocation.hash, href = storeLocation.href;
                var historyLocation = (0, locationFromUrl_1.default)(Router.asPath);
                var pathnameInHistory = historyLocation.pathname, searchInHistory = historyLocation.search, hashInHistory = historyLocation.hash;
                var locationMismatch = pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInStore !== hashInHistory;
                if (locationMismatch) {
                    var as = "".concat(pathnameInStore).concat(searchInStore).concat(hashInStore);
                    inTimeTravelling.current = true;
                    Router.replace(href, as);
                }
            }
            var unsubscribeStore = store.subscribe(listenStoreChanges);
            return unsubscribeStore;
        }, [Router, store, reducerKey]);
        (0, react_1.useEffect)(function () {
            var unpatchRouter = function () { };
            function onRouteChangeFinish(url) {
                if (!inTimeTravelling.current) {
                    var storeLocation = getIn(store.getState(), [reducerKey, 'location']);
                    if (url !== storeLocation.href) {
                        store.dispatch((0, actions_1.onLocationChanged)((0, locationFromUrl_1.default)(url)));
                    }
                }
                else {
                    inTimeTravelling.current = false;
                }
                trackRouteComplete();
            }
            Router.ready(function () {
                unpatchRouter = (0, patchRouter_1.default)(Router, store);
                Router.events.on('routeChangeStart', trackRouteStart);
                Router.events.on('routeChangeError', trackRouteComplete);
                Router.events.on('routeChangeComplete', onRouteChangeFinish);
                Router.events.on('hashChangeStart', trackRouteStart);
                Router.events.on('hashChangeComplete', onRouteChangeFinish);
            });
            return function () {
                unpatchRouter();
                Router.events.off('routeChangeStart', trackRouteStart);
                Router.events.off('routeChangeError', trackRouteComplete);
                Router.events.off('routeChangeComplete', onRouteChangeFinish);
                Router.events.off('hashChangeStart', trackRouteStart);
                Router.events.off('hashChangeComplete', onRouteChangeFinish);
            };
        }, [Router, reducerKey, store]);
        return react_1.default.createElement(react_1.default.Fragment, {}, props.children);
    };
    return ConnectedRouter;
};
exports.default = createConnectedRouter;
