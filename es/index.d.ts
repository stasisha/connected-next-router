/// <reference types="react" />
export { LOCATION_CHANGE, LocationChangeAction, CALL_ROUTER_METHOD, CallRouterMethodAction, CallRouterMethodPushPayload, CallRouterMethodReplacePayload, CallRouterMethodGoPayload, CallRouterMethodPrefetchPayload, routerActions, push, replace, go, goBack, goForward, prefetch, } from './actions';
export { default as routerMethods } from './routerMethods';
export { LocationState, RouterState } from './types';
export declare const initialRouterState: (url?: string) => import("./types").RouterState;
export declare const routerReducer: import("redux").Reducer<import("./types").RouterState, import("redux").AnyAction | import("./actions").LocationChangeAction>;
export declare const ConnectedRouter: import("react").FC<{
    children?: import("react").ReactNode;
    reducerKey?: string | undefined;
    Router?: import("next/router").SingletonRouter | undefined;
}>;
export declare const createRouterMiddleware: (middlewareOpts?: import("./middleware").RouterMiddlewareOpts) => import("redux").Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>>;
