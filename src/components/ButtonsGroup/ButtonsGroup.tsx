import React from "react";

import styles from "./buttons-group.module.scss";

export const ButtonsGroup: React.FC = ({ children }) => {
  return <div className={styles.ButtonsGroup}>{children}</div>;
};
