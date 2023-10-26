import { SingletonRouter, Router } from 'next/router';
import { Store } from 'redux';
declare type RouterToPatch = SingletonRouter & {
    router: Router;
};
declare const patchRouter: (Router: RouterToPatch, store: Store) => (() => void);
export default patchRouter;
