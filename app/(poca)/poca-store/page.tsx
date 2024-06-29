'use client';
import styles from './page.module.css';
import PocaStoreList from '../_components/pocaList/pocaStoreList';
import PocaCartList from '../_components/pocaCartList/pocaCartList';

export default function PocaStore() {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.productContents}>
        <PocaCartList />
        <PocaStoreList />
      </div>
    </main>
  );
}
