'use client';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Image from 'next/image';
import React from 'react';
import { Box, Typography } from '@mui/material';

export const orderItemsColumns: GridColDef[] = [
  {
    field: 'thumbNailUrl',
    headerName: '썸네일',
    width: 120,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ textAlign: 'center' }}>
        <Image
          alt="제품 이미지"
          unoptimized={true}
          src={params.value}
          width={100}
          height={100}
          style={{ objectFit: 'contain' }}
        />
      </Box>
    ),
  },
  {
    field: 'title',
    headerName: '제목',
    flex: 1.5,
    minWidth: 150,
  },
  {
    field: 'barcode',
    headerName: '바코드',
    flex: 1,
    minWidth: 120,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
  },
  {
    field: 'sku',
    headerName: 'sku',
    flex: 1,
    minWidth: 120,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
  },
  {
    field: 'price',
    headerName: '판매가',
    width: 100,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'qty',
    headerName: '판매수량',
    width: 80,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'totalPrice',
    headerName: '총액',
    width: 120,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
];
