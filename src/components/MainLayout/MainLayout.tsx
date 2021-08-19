import React from "react";

import { Header } from "../Header/Header";
import { Container } from "./Container/Container";

interface IMainLayoutProps {
  fullHeight?: boolean;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({
  children,
  fullHeight = false,
}) => {
  return (
    <div>
      <Header />
      <Container fullHeight={fullHeight}>{children}</Container>
    </div>
  );
};
