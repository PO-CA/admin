import { useGetSellsByUsers, useGetSellsWithMonth } from '@/query/query/stats';
import React, { useEffect } from 'react';
import styles from './index.module.css';

export default function StatsByMonth() {
  const {
    data: monthData,
    isLoading: isMonthLoading,
    isSuccess: isMonthSuccess,
  } = useGetSellsWithMonth();

  return (
    <div className={styles.statsContainer}>
      <div>월별</div>

      {!isMonthLoading && isMonthSuccess && monthData && (
        <div style={{ display: 'flex' }}>
          {monthData.map((item: any, i: number) => (
            <div key={i} style={{ marginRight: '20px' }}>
              <div>{item.month} 월</div>
              <div>매출액: {item.totalSell}</div>
              <div>판매수량: {item.totalQty}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
