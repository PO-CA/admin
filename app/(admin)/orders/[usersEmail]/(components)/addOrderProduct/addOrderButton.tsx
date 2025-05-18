'use client';
import { useCreateAOrderItem } from '@/query/query/orders';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddOrderButton({ row }: any) {
  const { mutate: createOrderItem } = useCreateAOrderItem();
  const pathName = usePathname();

  const [addOrderPayload, setAddOrderPayload] = useState({
    productId: row.id,
    orderQty: 0,
    usersEmail: pathName.replace('/orders/', ''),
  });

  useEffect(() => {
    setAddOrderPayload({
      ...addOrderPayload,
      usersEmail: pathName.replace('/orders/', ''),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

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
        value={addOrderPayload.orderQty}
        sx={{ width: '160px' }}
        onChange={(e) =>
          setAddOrderPayload({
            ...addOrderPayload,
            orderQty: Number(e.target.value),
          })
        }
        inputProps={{ min: 0 }}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          createOrderItem(addOrderPayload);
          setAddOrderPayload({ ...addOrderPayload, orderQty: 0 });
        }}
        startIcon={<AddIcon />}
        sx={{ minWidth: 'unset', px: 1 }}
      >
        추가
      </Button>
    </Box>
  );
}
