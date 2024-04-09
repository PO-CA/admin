'use client';
import styles from './page.module.css';
import UserAddress from './(components)/address';
import UserDcAmount from './(components)/dcAmount';
import UserDcRate from './(components)/dcRate';
import { useGetUsersDetailByUsersEmail } from '@/query/query/users';
import UserPermission from './(components)/userPermission';
import UserNickname from './(components)/userNickname';
import UpdateInCharge from './(components)/updateInCharge';

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
            <div>유저 아이디 : {usersData.userEmail}</div>
            <UserNickname usersData={usersData} />
            <UserPermission usersData={usersData} />
            <UpdateInCharge usersData={usersData} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <div className={styles.titleContainer}>유저-할인율</div>
          <div className={styles.tableContainer}>
            <UserDcRate usersEmail={usersEmail} />
          </div>
        </div>
        <div>
          <div className={styles.titleContainer}>유저-할인액</div>
          <div className={styles.tableContainer}>
            <UserDcAmount usersEmail={usersEmail} />
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
