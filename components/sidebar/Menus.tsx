import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import { MenusPropsInterface } from './index.types';

export default function Menus({ href, text }: MenusPropsInterface) {
  return (
    <Link href={href} className={styles.menusItem}>
      {text}
    </Link>
  );
}
