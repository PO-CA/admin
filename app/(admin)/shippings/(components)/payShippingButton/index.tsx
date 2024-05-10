'use client';
import { useUpdateShipping } from '@/query/query/shippings';
import React from 'react';

export default function PayShippingButton({ info }: any) {
  const { mutate: updateShippingItem } = useUpdateShipping();
  if (info.row.original.shippingStatus === '결제완료') return null;

  return (
    <button
      type="button"
      style={{ width: '40px' }}
      onClick={() => {
        updateShippingItem(info.row.original.id);
      }}
    >
      결제
    </button>
  );
}
