import React, { ReactNode } from "react";
import styles from "./modal.module.css";
export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}
