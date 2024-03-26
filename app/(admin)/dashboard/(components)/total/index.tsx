import {
  useGetTop5,
  useGetTotalQty,
  useGetTotalSell,
} from '@/query/query/stats';
import React from 'react';

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
    <div>
      <div>전체</div>
      <div>
        총 매출액
        {!isTotalSellLoading && isTotalSellSuccess && totalSell && totalSell}
      </div>
      <div>
        총 판매수량
        {!isTotalQtyLoading && isTotalQtySuccess && totalQty && totalQty}
      </div>
      <div>전체 TOP 5</div>
      {!isTop5Loading &&
        isTop5Success &&
        top5data &&
        top5data.map((item: any, i: number) => (
          <div key={i} style={{ display: 'flex' }}>
            <div>앨범명 : {item.title}</div>-
            <div>총 매출액 : {item.totalSell} 원</div>-
            <div>총 판매수량 : {item.totalQty} 개</div>
          </div>
        ))}
    </div>
  );
}
