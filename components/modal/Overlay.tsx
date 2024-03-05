import React, { ReactNode } from "react";
import styles from "./modal.module.css";
export default function Overlay({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: any;
}) {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
}
