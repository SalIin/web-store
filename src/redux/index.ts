import { createStore, Store, compose } from "redux";
import { DispatchType, IAction, IInitialState, rootReducer } from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store<IInitialState, IAction> & {
  dispatch: DispatchType;
} = createStore(rootReducer, composeEnhancers());
