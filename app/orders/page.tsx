import { Suspense } from 'react';
import styles from './page.module.css';
import UserListWithOrderQty from './(components)/userListWithOrderQty';

export default function Orders() {
  return (
    <main className={styles.mainContainer}>
      <div>유저-주문</div>
      <Suspense fallback={<div>유저정보 불러오는중</div>}>
        <UserListWithOrderQty />
      </Suspense>
    </main>
  );
}
