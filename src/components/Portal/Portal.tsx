import React from "react";
import { createPortal } from "react-dom";

import styles from "./portal.module.scss";

interface IModalProps {
  isOpen: boolean;
}

export const Portal: React.FC<IModalProps> = ({ children, isOpen }) => {
  const portalRoot = document.querySelector("#portal");

  return isOpen && portalRoot
    ? createPortal(
        <div className={styles.Backdrop}>{children}</div>,
        portalRoot
      )
    : null;
};
