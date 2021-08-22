import React from "react";
import { FloatingButton } from "../../components/FloatingButton/FloatingButton";

import { GoodsList } from "../../components/GoodsList/GoodsList";
import { MainLayout } from "../../components/MainLayout/MainLayout";

export const GoodsPage: React.FC = () => {
  return (
    <MainLayout>
      <GoodsList />
      <FloatingButton />
    </MainLayout>
  );
};
