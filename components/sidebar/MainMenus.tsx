import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import { MenusPropsInterface } from './index.types';

export default function MainMenus({
  href,
  text,
  onClick,
  subMenus,
}: MenusPropsInterface) {
  return (
    <>
      {href && href.length > 0 ? (
        <Link href={href} className={styles.menusItem}>
          {text}
        </Link>
      ) : subMenus && subMenus.length > 0 ? (
        <>
          <div className={styles.menusItem}>{text}</div>
          <div className={styles.subMenusItemContainer}>
            {subMenus.map((subMenu: any) => (
              <div key={subMenu.text} className={styles.subMenusItem}>
                <Link href={subMenu.href}>{subMenu.text}</Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div onClick={onClick}>{text}</div>
      )}
    </>
  );
}
