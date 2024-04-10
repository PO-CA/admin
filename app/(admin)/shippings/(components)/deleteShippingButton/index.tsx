'use client';
import { useDeleteShipping } from '@/query/query/shippings';
import React from 'react';

export default function DeleteShippingButton({ info }: any) {
  const { mutate: deleteShippingItem } = useDeleteShipping();

  return (
    <button
      type="button"
      style={{ width: '40px' }}
      onClick={() => {
        alert('이미 삭제된 상품은 주문으로 복구되지 않습니다.');
        deleteShippingItem(info.row.original.id);
      }}
    >
      삭제
    </button>
  );
}
