'use client';
import { useUpdateShipping } from '@/query/query/shippings';
import React from 'react';

export default function PayShippingButton({ info }: any) {
  const { mutate: updateShippingItem } = useUpdateShipping();

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
