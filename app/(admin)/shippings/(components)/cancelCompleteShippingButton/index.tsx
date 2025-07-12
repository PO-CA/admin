'use client';
import { useCancelCompleteShipping } from '@/query/query/shippings';
import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function CancelCompleteShippingButton({ info }: any) {
  const { mutate: cancelCompleteShippingItem, isPending } =
    useCancelCompleteShipping();

  const handleCancelComplete = async () => {
    cancelCompleteShippingItem(info.row.original.id);
  };

  if (info.row.original.shippingStatus !== '결제완료') return null;

  return (
    <Button
      color="primary"
      variant="contained"
      size="small"
      sx={{ minWidth: 80, fontWeight: 600 }}
      onClick={handleCancelComplete}
      disabled={isPending}
      startIcon={
        isPending ? <CircularProgress size={16} color="inherit" /> : null
      }
    >
      결제취소
    </Button>
  );
}
