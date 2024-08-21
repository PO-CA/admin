import { usePutFixedPriceOrderItem } from '@/query/query/orders';
import { updateOrderItemsPriceDTO } from '@/types/updateOrderItemsPriceDTO';
import React, { useEffect, useState } from 'react';

export default function UpdatePriceOrderItem({ info }: any) {
  const [payload, setPayload] = useState<updateOrderItemsPriceDTO>({
    id: info.row.original.id,
    price: info.row.original.price,
  });

  useEffect(() => {
    setPayload({
      id: info.row.original.id,
      price: info.row.original.price,
    });
  }, [info]);
  const { mutateAsync } = usePutFixedPriceOrderItem();

  return (
    <div>
      <input
        style={{ width: '100px' }}
        type="number"
        value={payload.price}
        onChange={(e) =>
          setPayload({ ...payload, price: Number(e.target.value) })
        }
      />
      <button
        onClick={() => {
          mutateAsync(payload);
        }}
      >
        수정
      </button>
    </div>
  );
}
