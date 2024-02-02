'use client';
import { useGetUsersDetailByUsersNickname } from '@/query/query/users';
import styles from './page.module.css';
import UserAddress from './(components)/address';
import UserDcAmount from './(components)/dcAmount';
import UserDcRate from './(components)/dcRate';

export default function CustomerDetail({
  params,
}: {
  params: { userNickname: string };
}) {
  const { userNickname } = params;
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsersDetailByUsersNickname(userNickname);

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
          <UserDcAmount userNickname={userNickname} />
        </div>
        <div>
          <div className={styles.subTitle}>유저-할인액</div>
          <UserDcRate userNickname={userNickname} />
        </div>
      </div>

      <div className={styles.subTitle}>배송지</div>
      <UserAddress userNickname={userNickname} />
    </main>
  );
}
