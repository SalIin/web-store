import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import { PRIVATE_ROUTES } from "../../routes";

import styles from "./button.module.scss";

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  component: "button" | "link";
  variant: "contained" | "outlined";
  size?: "l" | "m";
  to?: string;
}

export const Button: React.FC<IButtonProps> = ({
  component,
  children,
  to = PRIVATE_ROUTES.GOODS,
  variant,
  size = "l",
  ...restProps
}) => {
  switch (component) {
    case "button":
      return (
        <button
          className={classnames(styles.Button, {
            [styles[`Button_${size}`]]: size,
          })}
          {...restProps}
        >
          {children}
        </button>
      );
    case "link":
      return (
        <Link
          className={classnames(styles.Button, {
            [styles[`Button_${size}`]]: size,
          })}
          to={to}
        >
          {children}
        </Link>
      );
    default:
      return <button {...restProps}>{children}</button>;
  }
};
