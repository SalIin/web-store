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

export const updateProduct = async (
  productId: IProduct["id"],
  product: IProduct
) => {
  await db.collection("goods").doc(productId).update(product);
};

export const deleteProduct = async (id: IProduct["id"]) => {
  await db.collection("goods").doc(id).delete();
};

export const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.setAttribute("crossOrigin", "Anonymous");
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<string> => {
  const image: HTMLImageElement = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx!.translate(safeArea / 2, safeArea / 2);
  ctx!.translate(-safeArea / 2, -safeArea / 2);

  ctx!.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx!.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx!.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
};
