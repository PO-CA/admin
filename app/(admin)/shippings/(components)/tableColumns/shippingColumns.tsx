'use client';
import React from 'react';
import Link from 'next/link';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DeleteShippingButton from '../deleteShippingButton';
import PayShippingButton from '../payShippingButton';

export const shippingColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Link href={`/shippings/${params.value}`}>{params.value}</Link>
    ),
  },
  {
    field: 'createdAt',
    headerName: '발송일',
    flex: 1,
    valueGetter: (params: any) => {
      return params.slice(0, 10) || '';
    },
  },
  {
    field: 'userNickname',
    headerName: '닉네임',
    flex: 1,
  },
  {
    field: 'totalProductPrice',
    headerName: '상품가격',
    flex: 1,
  },
  {
    field: 'shippingFee',
    headerName: '배송비',
    flex: 1,
  },
  {
    field: 'memo',
    headerName: '배송메모',
    flex: 1,
  },
  {
    field: 'buttons',
    headerName: '',
    flex: 1.5,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <DeleteShippingButton info={{ row: { original: params.row } }} />
        <PayShippingButton info={{ row: { original: params.row } }} />
      </div>
    ),
  },
  {
    field: 'shippingStatus',
    headerName: '배송상태',
    flex: 1,
    valueGetter: (params: any) => {
      return params;
    },
  },
  {
    field: 'updatedAt',
    headerName: '배송/결제일',
    flex: 1,
    valueGetter: (params: any) => {
      return params?.slice(0, 10) || '';
    },
  },
];
