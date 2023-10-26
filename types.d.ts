export declare type LocationState = {
    href: string;
    pathname: string;
    hash: string;
    search: string;
};
export declare type RouterAction = 'POP' | 'PUSH' | 'REPLACE';
export declare type RouterState = {
    location: LocationState;
};
export declare type BeforePopStateCallback = (state: any) => boolean;
export declare type Structure = {
    fromJS(jsValue: unknown): unknown;
    getIn(state: unknown, keyPath: Iterable<unknown>): unknown;
    merge<S>(state: S, payload: {
        [key: string]: unknown;
    }): S;
};
export declare type InitialRouterStateCreator = (url: string) => RouterState;
export declare type InitialRouterStateCreatorFromStructure = (structure: Structure) => InitialRouterStateCreator;
