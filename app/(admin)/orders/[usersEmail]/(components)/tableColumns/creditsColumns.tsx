'use client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';

export const creditsColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.content,
    id: 'content',
    cell: (info) => info.getValue(),
    header: () => <span>내용</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.plus,
    id: 'plus',
    cell: (info) => info.getValue(),
    header: () => <span> ➕ </span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.minus,
    id: 'minus',
    cell: (info) => info.getValue(),
    header: () => <span> ➖ </span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.balance,
    id: 'balance',
    cell: (info) => info.getValue(),
    header: () => <span>잔액</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.memo,
    id: 'memo',
    cell: (info) => info.getValue(),
    header: () => <span>메모</span>,
    footer: (props) => props.column.id,
  },
];
