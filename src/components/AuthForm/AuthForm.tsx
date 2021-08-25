import React, { useState } from "react";
import classnames from "classnames";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

// Components
import { ButtonsGroup } from "../ButtonsGroup/ButtonsGroup";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";

import { notify } from "../../utils";

import { useAuth } from "../../customHooks/useAuth";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../routes";
import { EMAIL_REGEXP } from "../../constants";

import styles from "./auth-form.module.scss";

interface FormInputs {
  email: string;
  password: string;
}

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
      const response = await signin(email, password);
      if (response.code) {
        setLoading(false);
        notify("error", response.message);
      } else {
        redirectTo(PRIVATE_ROUTES.GOODS);
        setLoading(false);
        notify("success", "Successfully signed in!");
      }
    } else if (pathname === PUBLIC_ROUTES.SIGNUP) {
      const response = await signup(email, password);
      if (response.code) {
        setLoading(false);
        notify("error", response.message);
      } else {
        redirectTo(PRIVATE_ROUTES.GOODS);
        setLoading(false);
        notify("success", "Successfully signed up!");
      }
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

      <form
        className={styles.AuthForm}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <input
          type="email"
          className={classnames(styles["AuthForm-Control"], {
            [styles["AuthForm-Control_withError"]]: errors.email,
          })}
          placeholder="Email Address (required)"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: EMAIL_REGEXP,
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
