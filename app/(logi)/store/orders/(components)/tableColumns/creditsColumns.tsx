'use client';
import { GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import React from 'react';

export const creditsColumns: GridColDef[] = [
  {
    field: 'content',
    headerName: '내용',
    flex: 1.5,
    minWidth: 150,
  },
  {
    field: 'plus',
    headerName: '➕',
    width: 100,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'minus',
    headerName: '➖',
    width: 100,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'balance',
    headerName: '잔액',
    width: 120,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? `${params.toLocaleString()}원` : '';
    },
  },
  {
    field: 'memo',
    headerName: '메모',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'createdAt',
    headerName: '날짜',
    width: 120,
    align: 'right',
    headerAlign: 'center',
    valueFormatter: (params: any) => {
      return params ? params.slice(0, 10) : '';
    },
  },
];
