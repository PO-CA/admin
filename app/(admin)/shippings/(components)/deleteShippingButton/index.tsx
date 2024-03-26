'use client';
import { useDeleteShipping } from '@/query/query/shippings';
import React from 'react';

export default function DeleteShippingButton({ info }: any) {
  const { mutate: deleteShippingItem } = useDeleteShipping();

  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <button
        type="button"
        style={{ width: '40px' }}
        onClick={() => {
          // alert('기능 수정중입니다');
          deleteShippingItem(info.row.original.id);
        }}
      >
        삭제
      </button>
    </div>
  );
}
