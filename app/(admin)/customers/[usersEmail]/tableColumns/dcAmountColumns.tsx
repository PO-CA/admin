'use client';
import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import UpdateDcAmount from '../(components)/updateDcAmount';

export const dcAmountColumns: GridColDef[] = [
  {
    field: 'logiCategory',
    headerName: '카테고리',
    flex: 1,
    valueGetter: (params: any) => {
      return params?.title || '';
    },
  },
  {
    field: 'amount',
    headerName: '할인액',
    flex: 1,
    valueFormatter: (params: any) => {
      return `${params} 원`;
    },
  },
  {
    field: 'actions',
    headerName: '',
    flex: 1.5,
    filterable: false,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <UpdateDcAmount
        info={{
          getValue: () => params.row.amount,
          row: { original: params.row },
        }}
      />
    ),
  },
];
