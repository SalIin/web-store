import React from "react";

import { MainLayout } from "../../components/MainLayout/MainLayout";
import { NewProductForm } from "../../components/NewProductForm/NewProductForm";

import styles from "./new-product-page.module.scss";

export const NewProductPage: React.FC = () => {
  return (
    <MainLayout fullHeight>
      <main className={styles.NewProductPage}>
        <NewProductForm />
      </main>
    </MainLayout>
  );
};
