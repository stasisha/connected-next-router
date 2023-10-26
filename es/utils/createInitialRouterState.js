import locationFromUrl from './locationFromUrl';
var createInitialRouterState = function (_a) {
    var fromJS = _a.fromJS;
    return function (url) {
        if (url === void 0) { url = '/'; }
        var initialState = {
            location: locationFromUrl(url),
        };
        return fromJS(initialState);
    };
};
export default createInitialRouterState;
