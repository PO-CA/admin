'use client';
import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useIncreaseStock } from '@/query/query/products';

export default function ImportProductButton({ row }: any) {
  const { mutate: increaseStock, isPending } = useIncreaseStock();

  const [addOrderPayload, setAddOrderPayload] = useState({
    productId: row.id,
    quantity: 0,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <TextField
        type="number"
        size="small"
        value={addOrderPayload.quantity}
        sx={{ width: '160px' }}
        onChange={(e) =>
          setAddOrderPayload({
            ...addOrderPayload,
            quantity: Number(e.target.value),
          })
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isPending && addOrderPayload.quantity > 0) {
            e.preventDefault();
            increaseStock(addOrderPayload);
            setAddOrderPayload({ ...addOrderPayload, quantity: 0 });
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={isPending}
        onClick={() => {
          increaseStock(addOrderPayload);
          setAddOrderPayload({ ...addOrderPayload, quantity: 0 });
        }}
        startIcon={<AddIcon />}
        sx={{ minWidth: 'unset', px: 1 }}
      >
        {isPending ? '입고중...' : '입고'}
      </Button>
    </Box>
  );
}
