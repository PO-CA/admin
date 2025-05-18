'use client';
import React from 'react';
import DeleteCoordinateButton from './DeleteCoordinateButton';

export const coordinatesColumns = [
  {
    field: 'name',
    headerName: '좌표',
    flex: 1,
  },
  {
    field: 'delete',
    headerName: '',
    flex: 0.5,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => (
      <DeleteCoordinateButton row={{ original: params.row }} />
    ),
  },
];
