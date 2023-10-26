import { LOCATION_CHANGE } from './actions';
import createInitialRouterState from './utils/createInitialRouterState';
var createRouterReducer = function (structure) {
    var merge = structure.merge;
    var initialRouterState = createInitialRouterState(structure);
    var initialState = initialRouterState();
    return function routerReducer(state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case LOCATION_CHANGE: {
                return merge(state, action.payload);
            }
            default:
                return state;
        }
    };
};
export default createRouterReducer;
