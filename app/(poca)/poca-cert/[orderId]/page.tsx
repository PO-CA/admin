'use client';
import PocaOrdersList from '../../_components/pocaOrderList/pocaOrdersList';
import styles from './page.module.css';

export default function PocaOrdersDetail() {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.productContents}>
        <PocaOrdersList />
      </div>
    </main>
  );
}
