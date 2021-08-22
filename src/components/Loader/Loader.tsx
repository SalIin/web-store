import React from "react";
import styles from "./loader.module.scss";

interface ILoaderProps {
  color?: "black" | "white";
}

export const Loader: React.FC<ILoaderProps> = ({ color = "white" }) => {
  return (
    <div className={styles["lds-ring"]}>
      <div
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${color} transparent transparent transparent` }}
      ></div>
    </div>
  );
};
