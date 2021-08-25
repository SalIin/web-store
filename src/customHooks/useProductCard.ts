import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { deleteProduct, notify } from "../utils";
import { deleteProductFromStore } from "../redux/actionCreators";

import { IProduct } from "../types";

export const useProductCard = (
  saleExpiredDay: IProduct["saleExpiredDay"] | null,
  price: IProduct["price"]
) => {
  // State
  const [isFullDescriptionShown, setShowFullDescription] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);

  // Variables
  const dispatch = useDispatch();
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
    deleteProduct(idToDelete).then(() => {
      dispatch(deleteProductFromStore(idToDelete));
      notify("success", "Product deleted!");
    });
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
