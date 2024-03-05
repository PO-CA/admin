'use client';
import CartList from '../(components)/cartList';
import ProductList from '../(components)/productList';
import styles from './page.module.css';

export default function Store() {
  return (
    <main className={styles.addProductContainer}>
      <div className={styles.addProductTitle}>스토어</div>
      <ProductList />
      <CartList />
    </main>
  );
}
