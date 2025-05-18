'use client';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import DeleteCartButton from '../deleteCartButton';
import { Box } from '@mui/material';

export const cartColumns: GridColDef[] = [
  {
    field: 'logiProduct',
    headerName: '가수',
    flex: 1,
    minWidth: 120,
    valueGetter: (params: any) => {
      return params?.artist || '';
    },
  },
  {
    field: 'logiProduct',
    headerName: '제목',
    flex: 1.5,
    minWidth: 200,
    valueGetter: (params: any) => {
      return params?.title || '';
    },
  },
  {
    field: 'price',
    headerName: '가격',
    flex: 0.8,
    minWidth: 100,
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'qty',
    headerName: '수량',
    width: 80,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'totalPrice',
    headerName: '총액',
    flex: 0.8,
    minWidth: 100,
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'actions',
    headerName: '',
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <DeleteCartButton
          info={{
            getValue: () => params.row.id,
            row: { original: params.row },
          }}
        />
      </Box>
    ),
  },
];
