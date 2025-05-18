'use client';
import React from 'react';
import { useDeleteACategory } from '@/query/query/category';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function DeleteCategory({ categoryId }: { categoryId: number }) {
  const { mutate: deleteACategory, isPending } = useDeleteACategory();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!categoryId) return alert('카테고리를 선택하세요.');
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteACategory(categoryId);
    }
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleDelete}
        sx={{ fontWeight: 600, borderRadius: 2 }}
        disabled={isPending}
      >
        {isPending ? '삭제중...' : '삭제'}
      </Button>
    </Box>
  );
}
