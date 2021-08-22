import { useState } from "react";

import { IProduct } from "../types";

import moment from "moment";
import { deleteProduct } from "../utils";

export const useProductCard = (
  saleExpiredDay: IProduct["saleExpiredDay"] | null,
  price: IProduct["price"],
  setGoods: (goods: IProduct[]) => void
) => {
  // State
  const [isFullDescriptionShown, setShowFullDescription] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);

  // console.log(saleExpiredDay);

  // Variables
  const isSaleDate = saleExpiredDay
    ? moment(saleExpiredDay).isAfter(new Date().getTime() / 1000)
    : null;
  const expiredDate = saleExpiredDay
    ? moment.unix(saleExpiredDay).format("DD.MM.YYYY")
    : null;

  // Handlers
  const toggleFullDescription = () =>
    setShowFullDescription((prevState) => !prevState);
  const toggleMenu = () => setMenuOpened((prevState) => !prevState);
  const handleClickAwayMenu = () => setMenuOpened(false);
  const handleDeleteProduct = (idToDelete: IProduct["id"]) => {
    deleteProduct(idToDelete).then(() =>
      // @ts-ignore
      setGoods((prevGoods: IProduct[]) =>
        prevGoods.filter(({ id }) => id !== idToDelete)
      )
    );
  };

  // Helper functions
  const countSale = (sale: number) => {
    return (price - (price * sale) / 100).toFixed(2);
  };

  return {
    isFullDescriptionShown,
    isMenuOpened,
    isSaleDate,
    expiredDate,
    toggleFullDescription,
    handleClickAwayMenu,
    handleDeleteProduct,
    toggleMenu,
    countSale,
  };
};
