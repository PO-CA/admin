'use client';
import { useCreateAOrderItem } from '@/query/query/orders';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AddOrderButton({ info }: any) {
  const { mutate: createOrderItem } = useCreateAOrderItem();
  const pathName = usePathname();

  const [addOrderPayload, setAddOrderPayload] = useState({
    productId: info.getValue(),
    orderQty: 0,
    usersEmail: pathName.replace('/orders/', ''),
  });

  useEffect(() => {
    setAddOrderPayload({
      ...addOrderPayload,
      usersEmail: pathName.replace('/orders/', ''),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <input
        type="number"
        value={addOrderPayload.orderQty}
        style={{ width: '60px', height: '30px' }}
        onChange={(e) =>
          setAddOrderPayload({
            ...addOrderPayload,
            orderQty: Number(e.target.value),
          })
        }
      />
      <button
        type="button"
        style={{ width: '40px' }}
        onClick={() => {
          createOrderItem(addOrderPayload);
          setAddOrderPayload({ ...addOrderPayload, orderQty: 0 });
        }}
      >
        추가
      </button>
    </div>
  );
}
