import React from "react";
import classnames from "classnames";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ButtonsGroup } from "../ButtonsGroup/ButtonsGroup";

import { useAuth } from "../../customHooks/useAuth";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../routes";

import styles from "./auth-form.module.scss";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";

interface FormInputs {
  email: string;
  password: string;
}

// TODO: Add login / sign up error handlers

export const AuthForm: React.FC = () => {
  const { pathname } = useLocation();
  const { push: redirectTo } = useHistory();
  const { signin, signup } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isLoading, setLoading] = useState(false);
  const formType = pathname === PUBLIC_ROUTES.SIGNIN ? "Sign In" : "Sign Up";

  const onSubmit = async ({ email, password }: FormInputs) => {
    setLoading(true);

    if (pathname === PUBLIC_ROUTES.SIGNIN) {
      await signin(email, password);
      redirectTo(PRIVATE_ROUTES.GOODS);
      setLoading(false);
    } else if (pathname === PUBLIC_ROUTES.SIGNUP) {
      await signup(email, password);
      redirectTo(PRIVATE_ROUTES.GOODS);
      setLoading(false);
    }
  };

  return (
    <section className={styles.AuthFormWrapper}>
      <h2>{formType}</h2>
      <ButtonsGroup>
        <Link
          className={classnames(styles.NavigationButton, {
            [styles[`NavigationButton_active`]]:
              pathname === PUBLIC_ROUTES.SIGNIN,
          })}
          to={PUBLIC_ROUTES.SIGNIN}
        >
          sign in
        </Link>
        <Link
          className={classnames(styles.NavigationButton, {
            [styles[`NavigationButton_active`]]:
              pathname === PUBLIC_ROUTES.SIGNUP,
          })}
          to={PUBLIC_ROUTES.SIGNUP}
        >
          sign up
        </Link>
      </ButtonsGroup>

      <form className={styles.AuthForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          className={classnames(styles["AuthForm-Control"], {
            [styles["AuthForm-Control_withError"]]: errors.email,
          })}
          placeholder="Email Address (required)"
          {...register("email", {
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <small className={styles["AuthForm-Error"]}>
            {errors.email.message}
          </small>
        )}
        <input
          type="password"
          className={classnames(styles["AuthForm-Control"], {
            [styles["AuthForm-Control_withError"]]: errors.password,
          })}
          placeholder="Password (required)"
          {...register("password", {
            required: {
              value: true,
              message: "This field is required",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <small className={styles["AuthForm-Error"]}>
            {errors.password.message}
          </small>
        )}
        <Button
          variant="outlined"
          component="button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : formType}
        </Button>
      </form>
    </section>
  );
};
