import { useGetSellsByUsers } from '@/query/query/stats';
import React, { useEffect } from 'react';
import styles from './index.module.css';

export default function StatsByUsers() {
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetSellsByUsers();

  const [userData, setUserData] = React.useState<any>([]);
  const [selectedUser, setSelectedUser] = React.useState('');
  const [selectedData, setSelectedData] = React.useState([]);

  useEffect(() => {
    if (!isUsersLoading && isUsersSuccess) {
      setUserData(getUniqueNicknames(usersData));
    }
  }, [isUsersLoading, isUsersSuccess, selectedUser, usersData]);

  useEffect(() => {
    setSelectedData(
      usersData?.filter((item: any) => item.nickname === selectedUser),
    );
  }, [usersData, selectedUser]);

  function getUniqueNicknames(data: any) {
    const uniqueNicknames = [];
    const map = new Map();

    for (const item of data) {
      if (!map.has(item.nickname)) {
        map.set(item.nickname, true);
        uniqueNicknames.push(`${item.nickname}`);
      }
    }

    return uniqueNicknames;
  }

  return (
    <div className={styles.statsContainer}>
      <div>유저별</div>

      {!isUsersLoading && isUsersSuccess && usersData && (
        <div>
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">유저를 선택해 주세요</option>
            {userData.map((item: any, i: number) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          {userData && selectedData && (
            <div style={{ display: 'flex' }}>
              {selectedData.map((item: any, i: number) => (
                <div key={i} style={{ marginRight: '20px' }}>
                  <div>{item.month} 월</div>
                  <div>매출액: {item.totalSell}</div>
                  <div>판매수량: {item.totalQty}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
