import React from 'react';
import styles from './index.module.css';
import MenusContainer from './MenusContainer';
import Menus from './Menus';

export default function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.sidebarContainer}>{children}</div>;
}

Header.MenusConatiner = MenusContainer;
Header.Menus = Menus;
