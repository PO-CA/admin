'use client';
import { useCreateAOrderItem } from '@/query/query/orders';
import React, { useState } from 'react';

export default function AddOrderButton({ info }: any) {
  const { mutate: createOrderItem } = useCreateAOrderItem();

  const [addOrderPayload, setAddOrderPayload] = useState({
    productId: info.getValue(),
    orderQty: 0,
    userNickname: window.location.pathname.replace('/orders/', ''),
  });

  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <input
        type="number"
        value={addOrderPayload.orderQty}
        onChange={(e) =>
          setAddOrderPayload({
            ...addOrderPayload,
            orderQty: Number(e.target.value),
          })
        }
      />
      <button
        type="button"
        onClick={() => {
          console.log('asd', addOrderPayload);
          createOrderItem(addOrderPayload);
          setAddOrderPayload({ ...addOrderPayload, orderQty: 0 });
        }}
      >
        추가하기
      </button>
    </div>
  );
}
