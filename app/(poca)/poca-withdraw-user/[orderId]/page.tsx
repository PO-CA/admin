'use client';
import PocaWithdrawUserList from '../../_components/pocaWithdrawUserList';
import styles from './page.module.css';

export default function PocaOrdersDetail() {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.productContents}>
        <PocaWithdrawUserList />
      </div>
    </main>
  );
}
