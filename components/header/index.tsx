import React from 'react';
import styles from './index.module.css';
import { useSignOut } from '@/query/query/users';
import Link from 'next/link';

export default function Header() {
  const { mutateAsync: signOut } = useSignOut();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftContainer}>
        <Link className={styles.button} href="/dashboard">
          <button className={styles.button}>HOME</button>
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <Link className={styles.button} href="/store" target="_blank">
          <button className={styles.button}>STORE</button>
        </Link>

        <button
          className={styles.button}
          type="button"
          onClick={() => signOut()}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
