'use client';
import { useUpdateShipping } from '@/query/query/shippings';
import React from 'react';

export default function PayShippingButton({ info }: any) {
  const { mutate: updateShippingItem, isPending } = useUpdateShipping();
  if (info.row.original.shippingStatus === '결제완료') return null;

  return (
    <button
      type="button"
      disabled={isPending}
      style={{
        width: '40px',
        backgroundColor: isPending ? 'lightgray' : 'gray',
        color: 'white',
      }}
      onClick={() => {
        updateShippingItem(info.row.original.id);
      }}
    >
      {isPending ? '결제중...' : '결제'}
    </button>
  );
}
