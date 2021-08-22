import { db } from "../firebase";
import { IProduct } from "../types";

export const getAllGoods = async () => {
  const goods: IProduct[] = [];
  const snapshot = await db.collection("goods").get();
  snapshot.forEach((doc) => {
    goods.push(doc.data() as IProduct);
  });

  return goods;
};

export const createProduct = async (product: IProduct) => {
  await db.collection("goods").doc(product.id).set(product);
};

export const deleteProduct = async (id: IProduct["id"]) => {
  await db.collection("goods").doc(id).delete();
};

export const generateId = () => "_" + Math.random().toString(36).substr(2, 9);
