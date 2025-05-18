'use client';
import { useDeleteACoordinate } from '@/query/query/coordinate';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function DeleteCoordinateButton({ row }: any) {
  const { mutateAsync: deleteACoordinate, isPending } = useDeleteACoordinate();
  let coordinateId: number;
  if (row.original) {
    coordinateId = row.original.id;
  } else {
    coordinateId = row.id;
  }
  return (
    <Box sx={{ display: 'flex', width: 100 }}>
      <Button
        type="button"
        variant="outlined"
        color="error"
        size="small"
        onClick={async () => {
          await deleteACoordinate(coordinateId);
        }}
        disabled={isPending}
        sx={{ fontWeight: 600, borderRadius: 2 }}
      >
        {isPending ? '삭제중...' : '삭제'}
      </Button>
    </Box>
  );
}
