'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Link from 'next/link';

export const productColumns: ColumnDef<any, any>[] = [
  {
    id: 'select-col',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => (
      <Link href={`/products/${info.getValue()}`}>{info.getValue()}</Link>
    ),
    header: () => <span>ID</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.artist,
    id: 'artist',
    cell: (info) => info.getValue(),
    header: () => <span>가수</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.barcode,
    id: 'barcode',
    cell: (info) => info.getValue(),
    header: () => <span>바코드</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.ent,
    id: 'ent',
    cell: (info) => info.getValue(),
    header: () => <span>ent</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.logiCategory.title,
    id: 'logiCategory',
    cell: (info) => info.getValue(),
    header: () => <span>카테고리</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.member,
    id: 'member',
    cell: (info) => info.getValue(),
    header: () => <span>맴버</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => info.getValue(),
    header: () => <span>가격</span>,
    footer: (props) => props.column.id,
  },
];
