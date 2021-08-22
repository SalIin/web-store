import React from "react";
import { Link } from "react-router-dom";

import { PRIVATE_ROUTES } from "../../routes";

import styles from "./floating-button.module.scss";

export const FloatingButton: React.FC = () => {
  return (
    <Link
      to={PRIVATE_ROUTES.CREATE_PRODUCT}
      type="button"
      className={styles.FloatingButton}
    >
      <img src="/img/add.svg" alt="" />
    </Link>
  );
};
