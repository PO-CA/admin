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
      <div className={styles.subTitle}>고객-상세</div>

      {!isUsersLoading && isUsersSuccess && (
        <div className={styles.userDataContainer}>
          <div>아이디</div> <div>{usersData.nickname}</div> <div>아이디</div>{' '}
          <div>{usersData.nickname}</div> <div>아이디</div>{' '}
          <div>{usersData.nickname}</div>{' '}
        </div>
      )}

      <div style={{ display: 'flex' }}>
        <div>
          <div className={styles.subTitle}>유저-할인률</div>
          <UserDcAmount usersEmail={usersEmail} />
        </div>
        <div>
          <div className={styles.subTitle}>유저-할인액</div>
          <UserDcRate usersEmail={usersEmail} />
        </div>
      </div>

      <div className={styles.subTitle}>배송지</div>
      <UserAddress usersEmail={usersEmail} />
    </main>
  );
}
