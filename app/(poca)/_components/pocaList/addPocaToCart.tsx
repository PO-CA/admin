'use client';
import { useAuth } from '@/hooks/useAuth';
import { useAddPocaCart } from '@/query/query/poca/carts';
import React, { useState } from 'react';

export default function AddPocaToCart({ info }: any) {
  const { userId } = useAuth();

  const [qty, setQty] = useState(0);
  const qtyHandler = (e: any) => {
    setQty(Number(e.target.value));
  };

  const payload = {
    userId: userId,
    pocaId: info.row.original.id,
    qty,
    price: info.row.original.price,
  };

  const { mutateAsync: addPocaCart } = useAddPocaCart();

  const handleSubmit = () => {
    if (qty <= 0) {
      alert('올바를 수량을 써주세요.');
      return;
    }
    addPocaCart(payload);
    setQty(0);
  };
  return (
    <div>
      <div>판매가 : {info.row.original.price}</div>
      <div>재고 : {info.row.original.stock}</div>
      <input value={qty} type="number" onChange={qtyHandler} />
      <button type="button" onClick={handleSubmit}>
        추가
      </button>
    </div>
  );
}
