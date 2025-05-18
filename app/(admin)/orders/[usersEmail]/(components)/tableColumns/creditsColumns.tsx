'use client';
import React from 'react';

export const creditsColumns = [
  {
    field: 'createdAt',
    headerName: '날짜',
    flex: 1,
    valueGetter: (params: any) => params.value?.slice(0, 10),
  },
  {
    field: 'content',
    headerName: '내용',
    flex: 1,
  },
  {
    field: 'plus',
    headerName: '➕',
    flex: 1,
  },
  {
    field: 'minus',
    headerName: '➖',
    flex: 1,
  },
  {
    field: 'balance',
    headerName: '잔액',
    flex: 1,
  },
  {
    field: 'memo',
    headerName: '메모',
    flex: 1,
  },
];
