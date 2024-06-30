'use client';
import PocaShippingUserList from '../../_components/pocaShippingUserList';
import styles from './page.module.css';

export default function PocaOrdersDetail() {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.productContents}>
        <PocaShippingUserList />
      </div>
    </main>
  );
}
