import {
  useCreateAProductAveragePrice,
  useGetAllproductAveragePrice,
} from '@/query/query/products';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
export function ProductAverageModal({
  content,
  closeModal,
  productId,
}: {
  content: string;
  closeModal: () => void;
  productId: number;
}) {
  const { data: averagePrice, isSuccess } =
    useGetAllproductAveragePrice(productId);

  const { mutateAsync } = useCreateAProductAveragePrice();

  const [price, setPrice] = useState<any>(null);
  const [qty, setQty] = useState<any>(null);

  const [average, setAverage] = useState<any>(null);
  useEffect(() => {
    if (averagePrice) {
      setAverage({
        totalBuy: averagePrice.length,
        totalQty: averagePrice.reduce(
          (total: any, item: any) => total + item.qty,
          0,
        ),
        averagePrice: (function (items) {
          const totalQty = items.reduce(
            (total: any, item: any) => total + item.qty,
            0,
          );
          const totalPrice = items.reduce(
            (total: any, item: any) => total + item.price * item.qty,
            0,
          );
          if (totalQty === 0) return 0; // To avoid division by zero

          return totalPrice / totalQty;
        })(averagePrice),
      });
    }
  }, [averagePrice]);
  return (
    <div className={styles.alertModalContainer}>
      <div className={styles.alertModalTitle}>{content}</div>
      <div style={{ display: 'flex', marginBottom: '40px' }}>
        <div style={{ display: 'flex', marginRight: '40px' }}>
          <div>매입 : </div>
          <div>{average?.totalBuy} 건</div>
        </div>
        <div style={{ display: 'flex', marginRight: '40px' }}>
          <div>전체 매입량 : </div>
          <div>{average?.totalQty} 개</div>
        </div>
        <div style={{ display: 'flex', marginRight: '40px' }}>
          <div>평균매입가 : </div>
          <div>{average?.averagePrice?.toFixed(0)} 원</div>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '40px' }}>
        {isSuccess &&
          averagePrice &&
          averagePrice.map((item: any, i: number) => (
            <div style={{ marginRight: '20px' }} key={i}>
              <div>{i + 1}</div>
              <div style={{ display: 'flex' }}>
                <div>수량 : </div>
                <div> {item.qty} 개</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div>매입가 : </div>
                <div> {item.price} 원</div>
              </div>
            </div>
          ))}
      </div>

      <div style={{ display: 'flex' }}>
        <label>수량</label>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <label>매입가</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button
        className={styles.modalButton}
        onClick={() => {
          mutateAsync({ productId, qty, price });
          setQty(0);
          setPrice(0);
          alert('매입 내역을 추가했습니다.');
        }}
      >
        추가
      </button>
      <button className={styles.modalButton} onClick={closeModal}>
        닫기
      </button>
    </div>
  );
}
