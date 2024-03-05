'use client';
import styles from './page.module.css';
import { useIsAdmin } from '@/hooks/useIAdmin';

export default function Home() {
  useIsAdmin();

  return <main className={styles.mainContainer}>유저정보 확인중</main>;
}
