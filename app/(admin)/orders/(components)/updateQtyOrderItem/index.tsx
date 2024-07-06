import { usePutFixedQtyOrderItem } from '@/query/query/orders';
import { updateOrderItemsQtyDTO } from '@/types/updateOrderItemsQtyDTO';
import React, { useEffect, useState } from 'react';

export default function UpdateQtyOrderItem({ info }: any) {
  const [payload, setPayload] = useState<updateOrderItemsQtyDTO>({
    id: info.row.original.id,
    qty: info.row.original.qty,
  });

  useEffect(() => {
    setPayload({
      id: info.row.original.id,
      qty: info.row.original.qty,
    });
  }, [info]);
  const { mutateAsync } = usePutFixedQtyOrderItem();

  return (
    <div>
      <input
        style={{ width: '100px' }}
        type="number"
        value={payload.qty}
        onChange={(e) =>
          setPayload({ ...payload, qty: Number(e.target.value) })
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
