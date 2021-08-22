import React from "react";
import classnames from "classnames";

import styles from "./container.module.scss";

interface IContainerProps {
  fullHeight?: boolean;
  fullWidth?: boolean;
  noGutters?: boolean;
  display?: "flex" | "block";
  justify?: "center" | "space-between" | "flex-start" | "flex-end";
  alignItems?: "center" | "flex-start" | "flex-end";
}

export const Container: React.FC<IContainerProps> = ({
  children,
  fullHeight = false,
  fullWidth = false,
  noGutters = false,
  display = "block",
  justify = "flex-start",
  alignItems = "flex-start",
}) => {
  return (
    <div
      className={classnames(styles.Container, {
        [styles["Container_fullHeight"]]: fullHeight,
        [styles["Container_fullWidth"]]: fullWidth,
        [styles["Container_noGutters"]]: noGutters,
        [styles[`Container_display-${display}`]]: display,
        [styles[`Container_justify-${justify}`]]: justify,
        [styles[`Container_alignItems-${alignItems}`]]: alignItems,
      })}
    >
      {children}
    </div>
  );
};
