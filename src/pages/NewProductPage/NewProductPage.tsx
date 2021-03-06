import React from "react";

import { MainLayout } from "../../components/MainLayout/MainLayout";
import { ProductForm } from "../../components/ProductForm/ProductForm";

import styles from "./new-product-page.module.scss";

export const NewProductPage: React.FC = () => {
  return (
    <MainLayout fullHeight>
      <main className={styles.NewProductPage}>
        <ProductForm />
      </main>
    </MainLayout>
  );
};
