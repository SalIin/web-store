import { IProduct } from "../../types";
import { DELETE_PRODUCT, SET_GOODS } from "../actions";

export interface IInitialState {
  goods: IProduct[];
}
export interface IAction {
  type: string;
  payload?: any;
}
export type DispatchType = (args: IAction) => IAction;

const initialState: IInitialState = {
  goods: [],
};

export const rootReducer = (
  state: IInitialState = initialState,
  action: IAction
): IInitialState => {
  switch (action.type) {
    case SET_GOODS:
      return { ...state, goods: action.payload };
    case DELETE_PRODUCT:
      return {
        ...state,
        goods: state.goods.filter(({ id }) => id !== action.payload),
      };
    default:
      return state;
  }
};
