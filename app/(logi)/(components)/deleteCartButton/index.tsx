'use client';
import { useDeleteACart } from '@/query/query/cart';
import React from 'react';

export default function DeleteCartButton({ info }: any) {
  const { mutate: deleteCartItem } = useDeleteACart();

  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <button
        type="button"
        style={{ width: '40px' }}
        onClick={() => {
          deleteCartItem(info.row.original.id);
        }}
      >
        삭제
      </button>
    </div>
  );
}
