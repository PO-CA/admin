'use client';
import CartList from '../(components)/cartList/cartList';
import ProductList from '../(components)/productList/productList';
import styles from './page.module.css';

export default function Store() {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.titleContainer}>스토어</div>
      <div className={styles.productContents}>
        <ProductList />
        <CartList />
      </div>
    </main>
  );
}
