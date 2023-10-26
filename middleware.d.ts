import { SingletonRouter } from 'next/router';
import { RouterMethod } from './routerMethods';
import { Middleware } from 'redux';
import { Structure } from './types';
export declare type RouterMethodsObject = {
    [key in RouterMethod]?: string;
};
export declare type RouterMiddlewareOpts = {
    Router?: SingletonRouter;
    methods?: RouterMethodsObject;
    reducerKey?: string;
};
declare const createRouterMiddleware: (structure: Structure) => (middlewareOpts?: RouterMiddlewareOpts) => Middleware;
export default createRouterMiddleware;
