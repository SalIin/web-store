import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ListItem } from "./ListItem/ListItem";
import { Loader } from "../Loader/Loader";

import { getAllGoods } from "../../utils";

import { IProduct } from "../../types";

import styles from "./goods-list.module.scss";

import { setAllGoods } from "../../redux/actionCreators";
import { getAllGoodsFromStore } from "../../redux/selectors";

export const GoodsList: React.FC = () => {
  const dispatch = useDispatch();
  const goods: readonly IProduct[] = useSelector(getAllGoodsFromStore);

  useEffect(() => {
    getAllGoods().then((goods) => {
      dispatch(setAllGoods(goods));
    });
  }, []);

  if (!goods.length) {
    return (
      <div className={styles.LoaderWrapper}>
        <Loader color="black" />
      </div>
    );
  }

  return (
    <ul className={styles.GoodsList}>
      {goods.map(({ id, ...restProps }) => (
        <ListItem key={id} id={id} {...restProps} />
      ))}
    </ul>
  );
};
