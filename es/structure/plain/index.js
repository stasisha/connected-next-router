var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import getIn from './getIn';
var structure = {
    fromJS: function (value) { return value; },
    getIn: getIn,
    merge: function (state, payload) { return (__assign(__assign({}, state), payload)); }
};
export default structure;
