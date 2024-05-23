import { useGetInCharge, useGetInCharges } from '@/query/query/stats';
import React, { useState } from 'react';
import styles from './index.module.css';

export default function StatsByInCharge() {
  const {
    data: inChargesData,
    isLoading: isInChargesLoading,
    isSuccess: isInChargesSuccess,
  } = useGetInCharges();

  const [selectedInCharge, setSelectedInCharge] = useState<any>(null);

  const {
    data: inChargeData,
    isLoading: isInChargeLoading,
    isSuccess: isInChargeSuccess,
  } = useGetInCharge(selectedInCharge);

  return (
    <div className={styles.statsContainer}>
      <div>담당자별</div>

      {!isInChargesLoading && isInChargesSuccess && inChargesData && (
        <div>
          <select onChange={(e) => setSelectedInCharge(e.target.value)}>
            <option value={undefined}>담당자를 선택해 주세요</option>
            {inChargesData.map((item: any, i: number) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          {!isInChargeLoading &&
            isInChargeSuccess &&
            inChargeData &&
            selectedInCharge && (
              <div>
                <div>{selectedInCharge}</div>
                <div>매출액: {inChargeData.totalSell}</div>
                <div>판매수량: {inChargeData.totalQty}</div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
