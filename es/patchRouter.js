import ReactDOM from 'react-dom';
import { onLocationChanged } from './actions';
import locationFromUrl from './utils/locationFromUrl';
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
            ReactDOM.unstable_batchedUpdates(function () {
                unpatchedMethods.set.apply(Router.router, args).then(resolve, reject);
                store.dispatch(onLocationChanged(locationFromUrl(Router.asPath)));
            });
        });
    };
    return function () {
        Router.router.set = unpatchedMethods.set;
    };
};
export default patchRouter;
