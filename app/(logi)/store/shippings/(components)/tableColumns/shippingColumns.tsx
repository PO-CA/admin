'use client';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react';
import Link from 'next/link';

export const shippingColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <Link href={`/store/shippings/${params.value}`}>{params.value}</Link>
    ),
  },
  {
    field: 'createdAt',
    headerName: '발송일',
    width: 120,
    valueFormatter: (params: any) => {
      return params ? String(params).slice(0, 10) : '';
    },
  },
  {
    field: 'userNickname',
    headerName: '닉네임',
    width: 150,
  },
  {
    field: 'totalQty',
    headerName: '수량',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'totalProductPrice',
    headerName: '총 상품가격',
    width: 120,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'shippingFee',
    headerName: '배송비',
    width: 120,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'shippingStatus',
    headerName: '배송상태',
    width: 120,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? `${params}` : '';
    },
  },
  {
    field: 'memo',
    headerName: '배송메모',
    width: 200,
    flex: 1,
  },
];
