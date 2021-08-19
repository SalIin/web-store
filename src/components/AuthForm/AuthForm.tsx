import React from "react";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { ButtonsGroup } from "../ButtonsGroup/ButtonsGroup";

import styles from "./auth-form.module.scss";

export const AuthForm: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <section className={styles.AuthFormWrapper}>
      <h2>{pathname === "/signin" ? "Sign In" : "Sign Up"}</h2>
      <ButtonsGroup>
        <Link
          className={classnames(styles.NavigationButton, {
            [styles[`NavigationButton_active`]]: pathname === "/signin",
          })}
          to="/signin"
        >
          sign in
        </Link>
        <Link
          className={classnames(styles.NavigationButton, {
            [styles[`NavigationButton_active`]]: pathname === "/signup",
          })}
          to="/signup"
        >
          sign up
        </Link>
      </ButtonsGroup>

      <form className={styles.AuthForm}>
        <input
          type="email"
          className={`${styles["AuthForm-Control"]}`}
          placeholder="Email Address"
        />
        <input
          type="password"
          className={styles["AuthForm-Control"]}
          placeholder="Password"
        />
        <button type="submit" className={`${styles["AuthForm-Control"]}`}>
          {pathname === "/signin" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </section>
  );
};
