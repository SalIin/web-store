import React from "react";
import ClickAwayListener from "react-click-away-listener";
import classnames from "classnames";

import { useProductCard } from "../../../customHooks/useProductCard";

import { IProduct } from "../../../types";

import styles from "./list-item.module.scss";

// TODO: Высчитать кол-во дней до окончания скидки

interface IListItemProps {
  setGoods: (goods: IProduct[]) => void;
}

export const ListItem: React.FC<IProduct & IListItemProps> = ({
  id,
  title,
  price,
  img,
  description = "",
  sale = null,
  saleExpiredDay = null,
  setGoods,
}) => {
  const {
    isFullDescriptionShown,
    isMenuOpened,
    isSaleDate,
    expiredDate,
    toggleFullDescription,
    handleClickAwayMenu,
    handleDeleteProduct,
    toggleMenu,
    countSale,
  } = useProductCard(saleExpiredDay, price, setGoods);

  return (
    <li className={styles.ListItem}>
      <div className={styles.OverflowWrapper}>
        <img src={img} alt="" />
        <div className={styles.InfoBlock}>
          <div className={styles["InfoBlock-Title"]}>
            <h3>{title}</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <button
                type="button"
                className={styles["ListItem-MenuButton"]}
                onClick={toggleMenu}
              >
                <img src="/img/menu.svg" alt="" />
              </button>
              {isMenuOpened && (
                <ClickAwayListener onClickAway={handleClickAwayMenu}>
                  <menu className={styles["ListItem-Menu"]}>
                    <li role="button">
                      <img src="/img/edit.svg" alt="" />
                      Edit
                    </li>
                    <li role="button" onClick={() => handleDeleteProduct(id)}>
                      <img src="/img/delete.svg" alt="" />
                      Delete
                    </li>
                  </menu>
                </ClickAwayListener>
              )}
            </div>
          </div>
          <div className={styles["InfoBlock-Price"]}>
            <h4>
              &#36;{sale && isSaleDate ? countSale(sale) : price.toFixed(2)}
            </h4>
            {!!sale && isSaleDate && (
              <small>
                <sub>&#36;{price.toFixed(2)}</sub>
              </small>
            )}
          </div>
          {!!sale && isSaleDate && (
            <div className={styles["InfoBlock-ExpireDate"]}>
              <small>Sale expire date: {expiredDate}</small>
            </div>
          )}
          <p
            className={classnames(styles["InfoBlock-Description"], {
              [styles["InfoBlock-Description_withTopMargin"]]:
                !sale || !isSaleDate,
            })}
          >
            {description && `${description.slice(0, 65)}...`}
          </p>
        </div>
        <article
          className={classnames(styles["ListItem-FullDescription"], {
            [styles["ListItem-FullDescription_shown"]]: isFullDescriptionShown,
          })}
        >
          {description}
        </article>
      </div>

      {!!description && (
        <button
          type="button"
          className={styles["ListItem-MoreButton"]}
          onClick={toggleFullDescription}
        >
          <img
            src={`/img/${isFullDescriptionShown ? "minus" : "plus"}.svg`}
            alt=""
          />
        </button>
      )}
    </li>
  );
};