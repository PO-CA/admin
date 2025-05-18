'use client';
import DeleteCoordinateButton from '@/app/(admin)/addproduct/(components)/addCoordinate/DeleteCoordinateButton';
import React from 'react';
import DeleteProductCoordinateButton from '../deleteProductCoordinateButton';
import CreateProductCoordinateButton from '../createProductCoordinateButton';

export const updateCoordinatesColumns = [
  {
    field: 'name',
    headerName: '좌표',
    flex: 1,
  },
  {
    field: 'actions',
    headerName: '',
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => {
      return (
        <div style={{ display: 'flex', gap: 4 }}>
          <CreateProductCoordinateButton row={params.row} />
          <DeleteProductCoordinateButton row={params.row} />
          <DeleteCoordinateButton row={params.row} />
        </div>
      );
    },
  },
];
