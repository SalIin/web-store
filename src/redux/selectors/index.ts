import { IProduct } from "../../types";
import { IInitialState } from "../reducers";

export const getAllGoodsFromStore = (state: IInitialState) => state.goods;
export const getProductById = (
  state: IInitialState,
  productId: IProduct["id"] | undefined
) => {
  return state.goods.find(({ id }) => id === productId);
};
