'use client';
import { useGetTotalSell } from '@/query/query/stats';
import styles from './page.module.css';
import StatsTotal from './(components)/total';
import StatsByUsers from './(components)/byUsers';

export default function DashBoard() {
  return (
    <main className={styles.addProductContainer}>
      <div className={styles.titleContainer}>대시보드</div>
      <section className={styles.statsContainer}>
        <StatsTotal />
        <StatsByUsers />
      </section>
    </main>
  );
}
