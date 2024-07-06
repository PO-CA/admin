import {
  useGetInCharge,
  useGetInCharges,
  useGetSellsByInCharge,
} from '@/query/query/stats';
import React, { useEffect, useState } from 'react';
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
  //
  const {
    data: sellsByInChargeData,
    isLoading: isSellsByInChargeLoading,
    isSuccess: isSellsByInChargeSuccess,
  } = useGetSellsByInCharge();
  const [selectedData, setSelectedData] = React.useState([]);

  useEffect(() => {
    setSelectedData(
      sellsByInChargeData?.filter(
        (item: any) => item.inCharge === selectedInCharge,
      ),
    );
  }, [sellsByInChargeData, selectedInCharge]);

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
                <div>매출액: {inChargeData.totalSell.toLocaleString()} 원</div>
                <div>판매수량: {inChargeData.totalQty.toLocaleString()} 개</div>
              </div>
            )}
          {!isSellsByInChargeLoading &&
            isSellsByInChargeSuccess &&
            inChargesData &&
            selectedInCharge &&
            selectedData && (
              <div style={{ display: 'flex', marginTop: '20px' }}>
                {selectedData.map((item: any, i: number) => (
                  <div key={i} style={{ marginRight: '20px' }}>
                    <div>{item.month} 월</div>
                    <div>매출액: {item.totalSell.toLocaleString()} 원</div>
                    <div>판매수량: {item.totalQty.toLocaleString()} 개</div>
                  </div>
                ))}
              </div>
            )}
        </div>
      )}
    </div>
  );
}
