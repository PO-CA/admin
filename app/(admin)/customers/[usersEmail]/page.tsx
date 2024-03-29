'use client';
import styles from './page.module.css';
import UserAddress from './(components)/address';
import UserDcAmount from './(components)/dcAmount';
import UserDcRate from './(components)/dcRate';
import { useGetUsersDetailByUsersEmail } from '@/query/query/users';

export default function CustomerDetail({
  params,
}: {
  params: { usersEmail: string };
}) {
  const { usersEmail } = params;
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsersDetailByUsersEmail(usersEmail);

  return (
    <main className={styles.customersDetailContainer}>
      <div className={styles.titleContainer}>고객-상세</div>

      <div className={styles.titleContainer}>
        {!isUsersLoading && isUsersSuccess && (
          <div className={styles.userDataContainer}>
            <div>회사이름 : {usersData.nickname}</div>
            <div>유저 아이디 : {usersData.userEmail}</div>
            <div>유저 권한 : {usersData.userLevel}</div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <div className={styles.titleContainer}>유저-할인률</div>
          <div className={styles.tableContainer}>
            <UserDcAmount usersEmail={usersEmail} />
          </div>
        </div>
        <div>
          <div className={styles.titleContainer}>유저-할인액</div>
          <div className={styles.tableContainer}>
            <UserDcRate usersEmail={usersEmail} />
          </div>
        </div>
      </div>

      <div className={styles.titleContainer}>배송지</div>
      <div className={styles.tableContainer}>
        <UserAddress usersEmail={usersEmail} />
      </div>
    </main>
  );
}
