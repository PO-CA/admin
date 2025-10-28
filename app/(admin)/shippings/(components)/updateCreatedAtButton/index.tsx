'use client';
import { useUpdateShippingCreatedAt } from '@/query/query/shippings';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function UpdateCreatedAtButton({ info }: any) {
  const { mutate: updateCreatedAt, isPending } = useUpdateShippingCreatedAt();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleOpen = () => {
    // 현재 발송일을 기본값으로 설정 (YYYY-MM-DD 형식)
    const currentDate = info.row.original.createdAt?.slice(0, 10) || '';
    setSelectedDate(currentDate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate('');
  };

  const handleUpdate = () => {
    if (!selectedDate) {
      alert('날짜를 선택해주세요');
      return;
    }

    // ISO 8601 형식으로 변환 (시간은 00:00:00으로 설정)
    const isoDateTime = `${selectedDate}T00:00:00`;

    updateCreatedAt(
      {
        shippingId: info.row.original.id,
        createdAt: isoDateTime,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        size="small"
        sx={{ mr: 1, minWidth: 80, fontWeight: 600 }}
        onClick={handleOpen}
        disabled={isPending}
      >
        발송일 수정
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>발송일 수정</DialogTitle>
        <DialogContent>
          <TextField
            label="발송일"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            disabled={isPending}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            취소
          </Button>
          <Button
            onClick={handleUpdate}
            color="primary"
            variant="contained"
            disabled={isPending}
            startIcon={
              isPending ? <CircularProgress size={16} color="inherit" /> : null
            }
          >
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

