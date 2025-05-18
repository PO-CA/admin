'use client';
import { useUpdateShipping } from '@/query/query/shippings';
import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function PayShippingButton({ info }: any) {
  const { mutate: updateShippingItem, isPending } = useUpdateShipping();

  const handlePay = async () => {
    updateShippingItem(info.row.original.id);
  };

  if (info.row.original.shippingStatus === '결제완료') return null;

  return (
    <Button
      color="primary"
      variant="contained"
      size="small"
      sx={{ minWidth: 80, fontWeight: 600 }}
      onClick={handlePay}
      disabled={isPending}
      startIcon={
        isPending ? <CircularProgress size={16} color="inherit" /> : null
      }
    >
      결제
    </Button>
  );
}
