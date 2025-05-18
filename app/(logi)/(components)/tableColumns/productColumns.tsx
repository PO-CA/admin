'use client';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import AddCartButton from '../cartList/addCartButton';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

export const productColumns: GridColDef[] = [
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
    field: 'barcode',
    headerName: '바코드',
    width: 120,
  },
  {
    field: 'sku',
    headerName: 'sku',
    width: 120,
  },
  {
    field: 'title',
    headerName: '제목',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'deadlineDate',
    headerName: '주문마감일',
    width: 120,
    valueGetter: (params: any) => {
      return params ? params.slice(0, 10) : '';
    },
  },
  {
    field: 'releaseDate',
    headerName: '출시일',
    width: 120,
    valueGetter: (params: any) => {
      return params ? params.slice(0, 10) : '';
    },
  },
  {
    field: 'dcPrice',
    headerName: '가격',
    width: 100,
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'stock',
    headerName: '재고',
    width: 80,
  },
  {
    field: 'actions',
    headerName: '담기',
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <AddCartButton
          info={{
            getValue: () => params.row.id,
            row: { original: params.row },
          }}
        />
      </Box>
    ),
  },
];
