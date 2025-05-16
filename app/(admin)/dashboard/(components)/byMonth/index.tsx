import { useGetSellsByUsers, useGetSellsWithMonth } from '@/query/query/stats';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

export default function StatsByMonth() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const {
    data: monthData,
    isLoading: isMonthLoading,
    isSuccess: isMonthSuccess,
  } = useGetSellsWithMonth(year);

  return (
    <div className={styles.statsContainer}>
      <div>월별</div>
      <div style={{ marginBottom: 12 }}>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{ width: 100 }}
        >
          {Array.from({ length: 5 }).map((_, idx) => {
            const y = currentYear - idx;
            return (
              <option key={y} value={y}>
                {y}년
              </option>
            );
          })}
        </select>
      </div>
      {!isMonthLoading && isMonthSuccess && monthData && (
        <div style={{ display: 'flex' }}>
          {monthData.map((item: any, i: number) => (
            <div key={i} style={{ marginRight: '20px' }}>
              <div>{item.month} 월</div>
              <div>매출액: {item.totalSell.toLocaleString()} 원</div>
              <div>판매수량: {item.totalQty.toLocaleString()} 개</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
