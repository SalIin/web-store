import { IProduct } from "../../types";
import { DELETE_PRODUCT, SET_GOODS } from "../actions";

export const setAllGoods = (payload: IProduct[]) => ({
  type: SET_GOODS,
  payload,
});

export const deleteProductFromStore = (payload: IProduct["id"]) => ({
  type: DELETE_PRODUCT,
  payload,
});
