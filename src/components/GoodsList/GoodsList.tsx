import React, { useEffect, useState } from "react";

import { ListItem } from "./ListItem/ListItem";
import { Loader } from "../Loader/Loader";

import { getAllGoods } from "../../utils";

import { IProduct } from "../../types";

import styles from "./goods-list.module.scss";

export const GoodsList: React.FC = () => {
  const [goods, setGoods] = useState<IProduct[]>([]);

  useEffect(() => {
    getAllGoods().then(setGoods);
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
        <ListItem key={id} id={id} setGoods={setGoods} {...restProps} />
      ))}
    </ul>
  );
};
