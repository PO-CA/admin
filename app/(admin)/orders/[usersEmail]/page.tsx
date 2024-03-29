import styles from './page.module.css';
import Credits from './(components)/credits';
import OrdersPicked from './(components)/orders-picked';
import OrdersUnpicked from './(components)/orders-unpicked';
import AddOrderProduct from './(components)/addOrderProduct';
import UserShippings from './(components)/shippings';

export default function OrdersByUsersId({
  params,
}: {
  params: { usersEmail: string };
}) {
  const { usersEmail } = params;
  return (
    <main className={styles.ordersDetailContainer}>
      <div>
        <div className={styles.titleContainer}>유저-크레딧</div>
        <div className={styles.tableContainer}>
          <Credits usersEmail={usersEmail} />
        </div>
      </div>

      <div>
        <div className={styles.titleContainer}>주문-포장 전</div>
        <div className={styles.tableContainer}>
          <OrdersUnpicked usersEmail={usersEmail} />
        </div>
      </div>

      <div>
        <div className={styles.titleContainer}>주문-포장 중</div>
        <div className={styles.tableContainer}>
          <OrdersPicked usersEmail={usersEmail} />
        </div>
      </div>

      <div>
        <div className={styles.titleContainer}>추가주문</div>
        <div className={styles.tableContainer}>
          <AddOrderProduct />
        </div>
      </div>

      <div>
        <div className={styles.titleContainer}>배송</div>
        <div className={styles.tableContainer}>
          <UserShippings usersEmail={usersEmail} />
        </div>
      </div>
    </main>
  );
}
