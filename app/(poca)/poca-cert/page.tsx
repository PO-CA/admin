'use client';
import PocaCertsList from '../_components/pocaCertsList/pocaCertsList';
import styles from './page.module.css';

export default function PocaCerts() {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.productContents}>
        <PocaCertsList />
      </div>
    </main>
  );
}
