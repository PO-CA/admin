'use client';
import Credits from './(components)/credits';
import UserShippings from './(components)/shippings';
import styles from './page.module.css';
import UserOrders from './(components)/userOrders';
import { useAuth } from '@/hooks/useAuth';

export default function OrdersByUsersId({
  params,
}: {
  params: { userNickname: string };
}) {
  // TODO params 말고 유저 닉네임 가져올수 있어야함
  // const { userNickname } = params;
  const { userEmail } = useAuth();

  return (
    <main className={styles.ordersDetailContainer}>
      <div>
        <div className={styles.subTitle}>유저-크레딧</div>
        <Credits usersEmail={userEmail} />
      </div>

      <div>
        <div className={styles.subTitle}>주문</div>
        <UserOrders usersEmail={userEmail} />
      </div>

      <div>
        <div className={styles.subTitle}>배송</div>
        <UserShippings usersEmail={userEmail} />
      </div>
    </main>
  );
}
