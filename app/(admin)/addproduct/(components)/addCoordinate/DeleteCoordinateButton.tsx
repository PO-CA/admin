'use client';
import { useDeleteACoordinate } from '@/query/query/coordinate';
import React from 'react';

export default function DeleteCoordinateButton({ row }: any) {
  const { mutate: deleteACoordinate } = useDeleteACoordinate();
  return (
    <div style={{ display: 'flex', width: '100px' }}>
      <button
        type="button"
        style={{ width: '40px' }}
        onClick={() => {
          deleteACoordinate(row.original.id);
        }}
      >
        삭제
      </button>
    </div>
  );
}
