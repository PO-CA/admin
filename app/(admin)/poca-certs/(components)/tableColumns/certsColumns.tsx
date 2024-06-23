'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Link from 'next/link';

export const certsColumns: ColumnDef<any, any>[] = [
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
    accessorFn: (row) => row.nickname,
    id: 'nickname',
    cell: (info) => info.getValue(),
    header: () => <span>인증아이디</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.shippingMemo,
    id: 'shippingMemo',
    cell: (info) => info.getValue(),
    header: () => <span>메모</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.totalPrice,
    id: 'totalPrice',
    cell: (info) => info.getValue(),
    header: () => <span>총액</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.totalCount,
    id: 'totalCount',
    cell: (info) => info.getValue(),
    header: () => <span>수량</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.isCert,
    id: 'isCert',
    cell: (info) => (info.getValue() ? '✅' : '❌'),
    header: () => <span>인증여부</span>,
    footer: (props) => props.column.id,
  },
];
