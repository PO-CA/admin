'use client';
import PocaShippingList from '../_components/pocaCertsList/pocaShippingList';
import PocaWithdrawList from '../_components/pocaCertsList/pocaWithdrawList';
import styles from './page.module.css';

export default function PocaShippingUser() {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.productContents}>
        <PocaShippingList />
      </div>
    </main>
  );
}
