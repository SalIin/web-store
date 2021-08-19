import React from "react";
import classnames from "classnames";

import styles from "./container.module.scss";

interface IContainerProps {
  fullHeight?: boolean;
}

export const Container: React.FC<IContainerProps> = ({
  children,
  fullHeight = false,
}) => {
  return (
    <div
      className={classnames(styles.Container, {
        [styles["Container_fullHeight"]]: fullHeight,
      })}
    >
      {children}
    </div>
  );
};
