import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ListItem } from "./ListItem/ListItem";
import { Loader } from "../Loader/Loader";

import { getAllGoods } from "../../utils";

import { IProduct } from "../../types";

import styles from "./goods-list.module.scss";

import { setAllGoods } from "../../redux/actionCreators";
import { getAllGoodsFromStore } from "../../redux/selectors";
import { useState } from "react";
import { Button } from "../Button/Button";
import { PRIVATE_ROUTES } from "../../routes";
import { FloatingButton } from "../FloatingButton/FloatingButton";

export const GoodsList: React.FC = () => {
  const dispatch = useDispatch();
  const goods: readonly IProduct[] = useSelector(getAllGoodsFromStore);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllGoods().then((goods) => {
      dispatch(setAllGoods(goods));
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className={styles.CenterWrapper}>
        <Loader color="black" />
      </div>
    );
  }

  if (!isLoading && !goods.length) {
    return (
      <div className={styles.CenterWrapper}>
        <img src="/img/empty.svg" alt="No products" />
        <h3>There are no products</h3>
        <p>Try to add new one</p>
        <Button
          component="link"
          variant="outlined"
          color="dark"
          size="m"
          to={PRIVATE_ROUTES.CREATE_PRODUCT}
        >
          Add
        </Button>
      </div>
    );
  }

  return (
    <>
      <ul className={styles.GoodsList}>
        {goods.map(({ id, ...restProps }) => (
          <ListItem key={id} id={id} {...restProps} />
        ))}
      </ul>

      <FloatingButton />
    </>
  );
};
