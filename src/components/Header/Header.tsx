import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../customHooks/useAuth";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../routes";

import { Button } from "../Button/Button";
import { Container } from "../MainLayout/Container/Container";

import styles from "./header.module.scss";

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { signout } = useAuth();

  return (
    <header className={styles.Header}>
      <Container
        noGutters
        display="flex"
        justify="space-between"
        alignItems="center"
      >
        <Link to={PRIVATE_ROUTES.GOODS} className={styles["Header-Logo"]}>
          <h2>store</h2>
        </Link>
        {pathname !== PUBLIC_ROUTES.SIGNIN &&
          pathname !== PUBLIC_ROUTES.SIGNUP && (
            <nav className={styles[`Header-Navigation`]}>
              <Button
                variant="outlined"
                component="button"
                size="m"
                onClick={signout}
              >
                Sign Out
              </Button>
            </nav>
          )}
      </Container>
    </header>
  );
};
