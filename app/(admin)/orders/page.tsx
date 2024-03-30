import { Suspense } from 'react';
import styles from './page.module.css';
import UserListWithOrderQty from './(components)/userListWithOrderQty';

export default function Orders() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.titleContainer}>유저별-주문 내역</div>
      <div className={styles.tableContainer}>
        <UserListWithOrderQty />
      </div>
    </main>
  );
}
