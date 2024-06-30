'use client';
import PocaWithdrawList from '../_components/pocaCertsList/pocaWithdrawList';
import styles from './page.module.css';

export default function PocaWithdrawUser() {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.productContents}>
        <PocaWithdrawList />
      </div>
    </main>
  );
}
