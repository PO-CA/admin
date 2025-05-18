import { usePutFixedQtyOrderItem } from '@/query/query/orders';
import { updateOrderItemsQtyDTO } from '@/types/updateOrderItemsQtyDTO';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

export default function UpdateQtyOrderItem({ info }: any) {
  const [payload, setPayload] = useState<updateOrderItemsQtyDTO>({
    id: info.row.original.id,
    qty: info.row.original.qty,
  });

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setPayload({
      id: info.row.original.id,
      qty: info.row.original.qty,
    });
    setIsEdited(false);
  }, [info]);

  const { mutateAsync, isPending } = usePutFixedQtyOrderItem();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Number(e.target.value);
    setPayload({ ...payload, qty: newQty });
    setIsEdited(newQty !== info.row.original.qty);
  };

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutateAsync(payload).then(() => {
      setIsEdited(false);
    });
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const stopPropagationFocus = (e: React.FocusEvent) => {
    e.stopPropagation();
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
      onClick={stopPropagation}
    >
      <TextField
        size="small"
        type="number"
        value={payload.qty}
        onChange={handleChange}
        variant="outlined"
        onClick={stopPropagation}
        onFocus={stopPropagationFocus}
        sx={{
          width: '60px',
          '& .MuiOutlinedInput-root': {
            fontSize: '14px',
            height: '32px',
          },
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
            {
              '-webkit-appearance': 'none',
              margin: 0,
            },
          '& input[type=number]': {
            '-moz-appearance': 'textfield',
          },
        }}
        InputProps={{
          inputProps: {
            min: 1,
            style: { textAlign: 'right', paddingRight: '8px' },
          },
        }}
      />
      <Button
        size="small"
        variant={isEdited ? 'contained' : 'outlined'}
        color="primary"
        onClick={handleUpdate}
        disabled={isPending || !isEdited}
        sx={{ minWidth: '40px', height: '32px', fontSize: '12px' }}
      >
        {isPending ? '저장중' : '수정'}
      </Button>
    </Stack>
  );
}
