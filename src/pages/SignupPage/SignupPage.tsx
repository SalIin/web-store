import React from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { MainLayout } from "../../components/MainLayout/MainLayout";

import styles from "./signup-page.module.scss";

export const SignupPage: React.FC = () => {
  return (
    <MainLayout fullHeight>
      <main className={styles.SignupPage}>
        <AuthForm />
      </main>
    </MainLayout>
  );
};
