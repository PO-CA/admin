'use client';
import { useDeleteACart } from '@/query/query/cart';
import React from 'react';
import { Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteCartButton({ info }: any) {
  const { mutate: deleteCartItem, isPending } = useDeleteACart();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        color="error"
        size="small"
        startIcon={<DeleteIcon />}
        disabled={isPending}
        onClick={() => {
          deleteCartItem(info.row.original.id);
        }}
        sx={{ minWidth: 'unset', px: 1 }}
      >
        {isPending ? '삭제중...' : '삭제'}
      </Button>
    </Box>
  );
}
