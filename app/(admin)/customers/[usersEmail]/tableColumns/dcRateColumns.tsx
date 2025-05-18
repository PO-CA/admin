'use client';
import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import UpdateDcRate from '../(components)/updateDcRate';

export const dcRateColumns: GridColDef[] = [
  {
    field: 'logiCategory',
    headerName: '카테고리',
    flex: 1,
    valueGetter: (params: any) => {
      return params?.title || '';
    },
  },
  {
    field: 'rate',
    headerName: '할인률',
    flex: 1,
    valueFormatter: (params: any) => {
      return `${params} %`;
    },
  },
  {
    field: 'actions',
    headerName: '',
    flex: 1.5,
    filterable: false,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <UpdateDcRate
        info={{
          getValue: () => params.row.rate,
          row: { original: params.row },
        }}
      />
    ),
  },
];
