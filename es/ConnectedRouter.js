import React, { useEffect, useRef } from 'react';
import { useStore } from 'react-redux';
import NextRouter from 'next/router';
import { onLocationChanged } from './actions';
import locationFromUrl from './utils/locationFromUrl';
import patchRouter from './patchRouter';
var createConnectedRouter = function (structure) {
    var getIn = structure.getIn;
    var ConnectedRouter = function (props) {
        var Router = props.Router || NextRouter;
        var _a = props.reducerKey, reducerKey = _a === void 0 ? 'router' : _a;
        var store = useStore();
        var ongoingRouteChanges = useRef(0);
        var isTimeTravelEnabled = useRef(true);
        var inTimeTravelling = useRef(false);
        function trackRouteComplete() {
            isTimeTravelEnabled.current = --ongoingRouteChanges.current <= 0;
        }
        function trackRouteStart() {
            isTimeTravelEnabled.current = ++ongoingRouteChanges.current <= 0;
        }
        useEffect(function () {
            function listenStoreChanges() {
                if (!isTimeTravelEnabled.current) {
                    return;
                }
                var storeLocation = getIn(store.getState(), [reducerKey, 'location']);
                var pathnameInStore = storeLocation.pathname, searchInStore = storeLocation.search, hashInStore = storeLocation.hash, href = storeLocation.href;
                var historyLocation = locationFromUrl(Router.asPath);
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
        useEffect(function () {
            var unpatchRouter = function () { };
            function onRouteChangeFinish(url) {
                if (!inTimeTravelling.current) {
                    var storeLocation = getIn(store.getState(), [reducerKey, 'location']);
                    if (url !== storeLocation.href) {
                        store.dispatch(onLocationChanged(locationFromUrl(url)));
                    }
                }
                else {
                    inTimeTravelling.current = false;
                }
                trackRouteComplete();
            }
            Router.ready(function () {
                unpatchRouter = patchRouter(Router, store);
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
        return React.createElement(React.Fragment, {}, props.children);
    };
    return ConnectedRouter;
};
export default createConnectedRouter;
