import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import { MenusPropsInterface } from './index.types';

export default function Menus({ href, text, onClick }: MenusPropsInterface) {
  if (onClick) {
    return (
      <button onClick={onClick} className={styles.menusItem}>
        {text}
      </button>
    );
  }
  return (
    <Link href={href} className={styles.menusItem}>
      {text}
    </Link>
  );
}
