'use client';
import { useAuth } from '@/hooks/useAuth';
import { useCreateAOrderItem } from '@/query/query/orders';
import React, { useEffect, useState } from 'react';

export default function AddOrderButton({ info }: any) {
  const { mutate: createOrderItem } = useCreateAOrderItem();

  const { userEmail } = useAuth();

  const [addOrderPayload, setAddOrderPayload] = useState({
    productId: info.getValue(),
    orderQty: 0,
    usersEmail: userEmail,
  });

  useEffect(() => {
    setAddOrderPayload({
      ...addOrderPayload,
      usersEmail: userEmail,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

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
          console.log('addOrderPayload', addOrderPayload);
          createOrderItem(addOrderPayload);
          setAddOrderPayload({ ...addOrderPayload, orderQty: 0 });
        }}
      >
        추가하기
      </button>
    </div>
  );
}
