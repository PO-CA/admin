import { Suspense } from 'react';
import styles from './page.module.css';
import Credits from './(components)/credits';
import OrdersPicked from './(components)/orders-picked';
import OrdersUnpicked from './(components)/orders-unpicked';
import Shippings from './(components)/shippings';
import AddOrderProduct from './(components)/addOrderProduct';

export default function OrdersByUsersId({
  params,
}: {
  params: { userNickname: string };
}) {
  const { userNickname } = params;
  return (
    <main className={styles.ordersDetailContainer}>
      <div>
        <div className={styles.subTitle}>유저-크레딧</div>
        <Suspense fallback={<div>유저의 크레딧 정보 불러오는중</div>}>
          <Credits userNickname={userNickname} />
        </Suspense>
      </div>

      <div>
        <div className={styles.subTitle}>주문-포장 전</div>
        <Suspense fallback={<div>포장 전 주문정보 불러오는중</div>}>
          <OrdersPicked userNickname={userNickname} />
        </Suspense>
      </div>

      <div>
        <div className={styles.subTitle}>주문-포장 중</div>
        <Suspense fallback={<div>포장 중 주문정보 불러오는중</div>}>
          <OrdersUnpicked userNickname={userNickname} />
        </Suspense>
      </div>

      <div>
        <div className={styles.subTitle}>추가주문</div>
        <Suspense fallback={<div>상품정보 불러오는중</div>}>
          <AddOrderProduct />
        </Suspense>
      </div>

      <div>
        <div className={styles.subTitle}>배송</div>
        <Suspense fallback={<div>배송 주문정보 불러오는중</div>}>
          <Shippings userNickname={userNickname} />
        </Suspense>
      </div>
    </main>
  );
}
