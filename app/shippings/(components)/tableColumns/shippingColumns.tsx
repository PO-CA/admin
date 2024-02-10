'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Link from 'next/link';

export const shippingColumns: ColumnDef<any, any>[] = [
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
    accessorFn: (row) => row.userNickname,
    id: 'userNickname',
    cell: (info) => info.getValue(),
    header: () => <span>닉네임</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.totalQty,
    id: 'totalQty',
    cell: (info) => info.getValue(),
    header: () => <span>수량</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.totalProductPrice,
    id: 'totalProductPrice',
    cell: (info) => info.getValue(),
    header: () => <span>상품가격</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.shippingFee,
    id: 'shippingFee',
    cell: (info) => info.getValue(),
    header: () => <span>배송비</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.memo,
    id: 'memo',
    cell: (info) => info.getValue(),
    header: () => <span>배송메모</span>,
    footer: (props) => props.column.id,
  },
];
