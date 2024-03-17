'use client';
import { useAuth } from '@/hooks/useAuth';
import { useCreateACart } from '@/query/query/cart';
import { CreateCartItemDTO } from '@/types/createCartItemDTO';
import React, { useState } from 'react';

export default function AddCartButton({ info }: any) {
  const { mutate: createCartItem } = useCreateACart();
  const { userId } = useAuth();
  const [addOrderPayload, setAddOrderPayload] = useState<CreateCartItemDTO>({
    price: info.row.original.dcPrice,
    productId: info.getValue(),
    qty: 0,
    userId: userId,
  });

  return (
    <div style={{ display: 'flex' }}>
      <input
        type="number"
        value={addOrderPayload.qty}
        onChange={(e) =>
          setAddOrderPayload({
            ...addOrderPayload,
            qty: Number(e.target.value),
          })
        }
      />
      <button
        type="button"
        onClick={() => {
          createCartItem(addOrderPayload);
          setAddOrderPayload({ ...addOrderPayload, qty: 0 });
        }}
      >
        추가하기
      </button>
    </div>
  );
}
