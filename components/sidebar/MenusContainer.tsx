import React from 'react';
import styles from './index.module.css';

export default function MenusContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.menusContainer}>{children}</div>;
}
