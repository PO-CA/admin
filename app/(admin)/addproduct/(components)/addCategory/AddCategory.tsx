'use client';
import React, { useState } from 'react';
import { useCreateACategory } from '@/query/query/category';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function AddCategory() {
  const { mutateAsync: createACategory, isPending } = useCreateACategory();
  const [category, setCategory] = useState('');

  const handleAdd = async () => {
    if (!category.trim()) return alert('카테고리명을 입력하세요.');
    try {
      await createACategory(category);
      setCategory('');
    } catch (err) {
      console.error(err);
      alert('카테고리 추가에 실패했습니다.');
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
      <TextField
        size="small"
        variant="outlined"
        label="카테고리명"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ minWidth: 160 }}
      />
      <Button
        type="button"
        variant="contained"
        size="small"
        sx={{ fontWeight: 600, borderRadius: 2 }}
        disabled={isPending}
        onClick={handleAdd}
      >
        {isPending ? '추가중...' : '추가'}
      </Button>
    </Box>
  );
}
