import React from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { MainLayout } from "../../components/MainLayout/MainLayout";

import styles from "./signin-page.module.scss";

export const SigninPage: React.FC = () => {
  return (
    <MainLayout fullHeight>
      <main className={styles.SigninPage}>
        <AuthForm />
      </main>
    </MainLayout>
  );
};
