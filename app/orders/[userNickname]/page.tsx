import { Suspense } from 'react';
import styles from './page.module.css';
import Credits from './(components)/credits';
import OrdersPicked from './(components)/orders-picked';
import OrdersUnpicked from './(components)/orders-unpicked';

export default function OrdersByUsersId({
  params,
}: {
  params: { userNickname: string };
}) {
  const { userNickname } = params;
  return (
    <main className={styles.ordersDetailContainer}>
      <div>유저-크레딧</div>
      <Suspense fallback={<div>유저의 크레딧 정보 불러오는중</div>}>
        <Credits userNickname={userNickname} />
      </Suspense>

      <div>주문-포장 전</div>
      <Suspense fallback={<div>포장 전 주문정보 불러오는중</div>}>
        <OrdersPicked userNickname={userNickname} />
      </Suspense>

      <div>주문-포장 중</div>
      <Suspense fallback={<div>포장 중 주문정보 불러오는중</div>}>
        <OrdersUnpicked userNickname={userNickname} />
      </Suspense>
    </main>
  );
}
