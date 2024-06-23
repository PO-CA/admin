'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Link from 'next/link';

export const pocaShippingColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => (
      <Link href={`/shippings/${info.getValue()}`}>{info.getValue()}</Link>
    ),
    header: () => <span>ID</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.createdAt,
    id: 'createdAt',
    header: '주문일',
    cell: (info) => info.getValue()?.substr(0, 10),
  },
  {
    accessorFn: (row) => row.ordersStatus,
    id: 'ordersStatus',
    header: '상태',
    cell: (info) => info.getValue()?.substr(0, 10),
  },
  {
    accessorFn: (row) => row.nickname,
    id: 'nickname',
    header: '아이디',
    cell: (info) => info.getValue()?.substr(0, 10),
  },
  {
    accessorFn: (row) => row.receiver,
    id: 'receiver',
    header: '수령인',
    cell: (info) => info.getValue()?.substr(0, 10),
  },

  {
    accessorFn: (row) => row.totalCount,
    id: 'totalCount',
    header: '수량',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.totalPrice,
    id: 'totalPrice',
    header: '가격',
    cell: (info) => info.getValue(),
  },
];
