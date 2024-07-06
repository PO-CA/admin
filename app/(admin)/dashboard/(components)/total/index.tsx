import {
  useGetTop5,
  useGetTotalQty,
  useGetTotalSell,
} from '@/query/query/stats';
import React from 'react';
import styles from './index.module.css';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => null, // 로딩 중에 보여줄 컴포넌트
});

export default function StatsTotal() {
  const {
    data: totalSell,
    isLoading: isTotalSellLoading,
    isSuccess: isTotalSellSuccess,
  } = useGetTotalSell();

  const {
    data: totalQty,
    isLoading: isTotalQtyLoading,
    isSuccess: isTotalQtySuccess,
  } = useGetTotalQty();

  const {
    data: top5data,
    isLoading: isTop5Loading,
    isSuccess: isTop5Success,
  } = useGetTop5();
  return (
    <div className={styles.totalContainer}>
      <div className={styles.statsContainer} style={{ width: '30%' }}>
        <div>전체</div>
        <div>
          총 매출액 :
          {!isTotalSellLoading &&
            isTotalSellSuccess &&
            totalSell &&
            totalSell.toLocaleString()}{' '}
          원
        </div>
        <div>
          총 판매수량 :
          {!isTotalQtyLoading &&
            isTotalQtySuccess &&
            totalQty &&
            totalQty.toLocaleString()}{' '}
          개
        </div>
      </div>
      <div className={styles.statsContainer} style={{ width: '70%' }}>
        <div>전체 TOP 5</div>
        {!isTop5Loading &&
          isTop5Success &&
          top5data &&
          top5data.map((item: any, i: number) => (
            <>
              <div key={i} style={{ display: 'flex' }}>
                <div>앨범명 : {item.title}</div>-
                <div>총 매출액 : {item.totalSell.toLocaleString()} 원</div>-
                <div>총 판매수량 : {item.totalQty.toLocaleString()} 개</div>
              </div>
            </>
          ))}
        {/* <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
            { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        /> */}
      </div>
    </div>
  );
}
