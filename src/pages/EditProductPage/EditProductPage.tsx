import React from "react";

import { MainLayout } from "../../components/MainLayout/MainLayout";
import { ProductForm } from "../../components/ProductForm/ProductForm";

import styles from "./edit-product-page.module.scss";

export const EditProductPage: React.FC = () => {
  return (
    <MainLayout fullHeight>
      <main className={styles.EditProductPage}>
        <ProductForm />
      </main>
    </MainLayout>
  );
};
