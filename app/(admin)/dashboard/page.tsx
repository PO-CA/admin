'use client';
import styles from './page.module.css';
import StatsTotal from './(components)/total';
import StatsByUsers from './(components)/byUsers';
import StatsByMonth from './(components)/byMonth';
import StatsByInCharge from './(components)/byInCharge';

export default function DashBoard() {
  return (
    <main className={styles.addProductContainer}>
      <div className={styles.titleContainer}>대시보드</div>
      <section className={styles.statsContainer}>
        <StatsTotal />
        <StatsByUsers />
        <StatsByMonth />
        <StatsByInCharge />
      </section>
    </main>
  );
}
