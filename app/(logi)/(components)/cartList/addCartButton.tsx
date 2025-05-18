'use client';
import { useAuth } from '@/hooks/useAuth';
import { useCreateACart } from '@/query/query/cart';
import { CreateCartItemDTO } from '@/types/createCartItemDTO';
import React, { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function AddCartButton({ info }: any) {
  const { mutate: createCartItem, isPending } = useCreateACart();
  const { userId } = useAuth();
  const [addOrderPayload, setAddOrderPayload] = useState<CreateCartItemDTO>({
    price: info.row.original.dcPrice,
    productId: info.getValue(),
    qty: 0,
    userId: userId,
  });

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        type="number"
        size="small"
        value={addOrderPayload.qty}
        onChange={(e) =>
          setAddOrderPayload({
            ...addOrderPayload,
            qty: Number(e.target.value),
          })
        }
        InputProps={{
          inputProps: { min: 0 },
        }}
        sx={{ width: 60 }}
      />
      <Button
        variant="contained"
        size="small"
        startIcon={<AddShoppingCartIcon />}
        onClick={() => {
          createCartItem(addOrderPayload);
          setAddOrderPayload({ ...addOrderPayload, qty: 0 });
        }}
        disabled={isPending || addOrderPayload.qty <= 0}
        sx={{ minWidth: 'unset', px: 1 }}
      >
        {isPending ? '추가중...' : '추가'}
      </Button>
    </Stack>
  );
}
