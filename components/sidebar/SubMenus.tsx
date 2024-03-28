import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import { MenusPropsInterface } from './index.types';

export default function SubMenus({ href, text, onClick }: MenusPropsInterface) {
  return (
    <>
      {href && href.length > 0 ? (
        <Link href={href} className={styles.menusItem}>
          {text}
        </Link>
      ) : (
        <div onClick={onClick}>{text}</div>
      )}
    </>
  );
}
