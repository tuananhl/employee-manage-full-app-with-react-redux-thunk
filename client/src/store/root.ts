import { createStore, applyMiddleware, Middleware, MiddlewareAPI, StoreEnhancer, compose } from 'redux';
import reducer from './reducers/index';
import { Dispatch } from 'react';

const customMiddleWare: Middleware = (store: MiddlewareAPI<any, any>) => (next: Dispatch<any>) => (action: any) => {
    if (typeof action === "function") return action(store.dispatch, store.getState)
    return next(action);
}
export const configureStore = (inititalState?: any) => {
    const middlewares: Middleware[] = [customMiddleWare];
    const middlewareEnhancer: StoreEnhancer = applyMiddleware(...middlewares);
    const store = createStore(reducer, inititalState, compose(middlewareEnhancer));

    return store;
}

export default configureStore;