import styles from './page.module.css';
import Credits from './(components)/credits';
import OrdersPicked from './(components)/orders-picked';
import OrdersUnpicked from './(components)/orders-unpicked';
import AddOrderProduct from './(components)/addOrderProduct';
import UserShippings from './(components)/shippings';

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
        <Credits userNickname={userNickname} />
      </div>

      <div>
        <div className={styles.subTitle}>주문-포장 전</div>
        <OrdersUnpicked userNickname={userNickname} />
      </div>

      <div>
        <div className={styles.subTitle}>주문-포장 중</div>
        <OrdersPicked userNickname={userNickname} />
      </div>

      <div>
        <div className={styles.subTitle}>추가주문</div>
        <AddOrderProduct />
      </div>

      <div>
        <div className={styles.subTitle}>배송</div>
        <UserShippings userNickname={userNickname} />
      </div>
    </main>
  );
}
