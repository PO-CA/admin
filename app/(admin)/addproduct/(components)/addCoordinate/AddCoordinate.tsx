'use client';
import React, { useState } from 'react';
import { useCreateACoordinate } from '@/query/query/coordinate';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function AddCoordinate() {
  const { mutateAsync: createACoordinate, isPending } = useCreateACoordinate();
  const [coordinate, setCoordinate] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coordinate.trim()) return alert('좌표명을 입력하세요.');
    await createACoordinate(coordinate);
    setCoordinate('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
      <TextField
        size="small"
        variant="outlined"
        label="좌표명"
        value={coordinate}
        onChange={(e) => setCoordinate(e.target.value)}
        sx={{ minWidth: 160 }}
      />
      <Button
        type="submit"
        variant="contained"
        size="small"
        disabled={isPending}
        sx={{ fontWeight: 600, borderRadius: 2 }}
        onClick={handleAdd}
      >
        {isPending ? '추가중...' : '추가'}
      </Button>
    </Box>
  );
}
