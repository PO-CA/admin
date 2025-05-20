'use client';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import ImportProductButton from './importProductButton';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const importProductsColumns: GridColDef[] = [
  {
    field: 'actions',
    headerName: '입고',
    width: 200,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return <ImportProductButton row={params.row} />;
    },
  },
  {
    field: 'stock',
    headerName: '재고',
    width: 65,
    type: 'number',
  },
  {
    field: 'thumbNailUrl',
    headerName: '썸네일',
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Image
          alt="썸네일"
          unoptimized={true}
          src={params.value}
          width={70}
          height={70}
          style={{ objectFit: 'contain' }}
        />
      </Box>
    ),
  },
  {
    field: 'title',
    headerName: '앨범명',
    width: 400,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography sx={{ whiteSpace: 'normal', lineHeight: 1.2 }}>
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'coordinateNames',
    headerName: '위치',
    width: 120,
  },
  {
    field: 'barcode',
    headerName: '바코드',
    width: 150,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography>{params.value}</Typography>
      </Box>
    ),
  },
  {
    field: 'sku',
    headerName: 'SKU',
    width: 120,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography>{params.value}</Typography>
      </Box>
    ),
  },

  {
    field: 'dcPrice',
    headerName: '가격',
    width: 100,
    type: 'number',
  },

  {
    field: 'releaseDate',
    headerName: '출시일',
    width: 120,
    renderCell: (params) => {
      const value = params.value;
      if (value && typeof value === 'string') {
        return value.slice(0, 10);
      }
      return value;
    },
  },
];
