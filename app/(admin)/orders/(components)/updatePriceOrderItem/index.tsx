import { usePutFixedPriceOrderItem } from '@/query/query/orders';
import { updateOrderItemsPriceDTO } from '@/types/updateOrderItemsPriceDTO';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

export default function UpdatePriceOrderItem({ info }: any) {
  const [payload, setPayload] = useState<updateOrderItemsPriceDTO>({
    id: info.row.original.id,
    price: info.row.original.price,
  });

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setPayload({
      id: info.row.original.id,
      price: info.row.original.price,
    });
    setIsEdited(false);
  }, [info]);

  const { mutateAsync, isPending } = usePutFixedPriceOrderItem();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    setPayload({ ...payload, price: newPrice });
    setIsEdited(newPrice !== info.row.original.price);
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
        value={payload.price}
        onChange={handleChange}
        variant="outlined"
        onClick={stopPropagation}
        onFocus={stopPropagationFocus}
        sx={{
          width: '80px',
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
            min: 0,
            style: { textAlign: 'right', paddingRight: '8px' },
          },
          onClick: stopPropagation,
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
