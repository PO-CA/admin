import { useGetSellsByUsers } from '@/query/query/stats';
import React, { useEffect } from 'react';
import styles from './index.module.css';

export default function StatsByUsers() {
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetSellsByUsers();

  const [userData, setUserData] = React.useState<any>({});
  const [selectedUser, setSelectedUser] = React.useState('');

  useEffect(() => {
    if (!isUsersLoading && isUsersSuccess) {
      setUserData(usersData.find((item: any) => item.email === selectedUser));
    }
  }, [isUsersLoading, isUsersSuccess, selectedUser, usersData]);

  return (
    <div className={styles.statsContainer}>
      <div>유저별</div>

      {!isUsersLoading && isUsersSuccess && usersData && (
        <div>
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">유저를 선택해 주세요</option>
            {usersData.map((item: any, i: number) => (
              <option key={i} value={item.email}>
                {item.email}-{item.nickname}
              </option>
            ))}
          </select>
          {userData && (
            <div>
              <div>이메일 : {userData.email}</div>
              <div>매출액: {userData.totalSell}</div>
              <div>판매수량: {userData.totalQty}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
