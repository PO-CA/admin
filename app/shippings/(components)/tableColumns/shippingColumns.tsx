'use client';
import { ColumnDef, SortingFn, sortingFns } from '@tanstack/react-table';
import React from 'react';
import { compareItems } from '@tanstack/match-sorter-utils';
import Link from 'next/link';

export const shippingColumns: ColumnDef<any, any>[] = [
  // {
  //   id: 'select-col',
  //   header: ({ table }) => (
  //     <input
  //       type="checkbox"
  //       checked={table.getIsAllRowsSelected()}
  //       // indeterminate={table.getIsSomeRowsSelected()}
  //       onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <input
  //       type="checkbox"
  //       checked={row.getIsSelected()}
  //       disabled={!row.getCanSelect()}
  //       onChange={row.getToggleSelectedHandler()}
  //     />
  //   ),
  // },
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => info.getValue(),
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
  // {
  //   accessorFn: (row) => row.logiCategory.title,
  //   id: 'logiCategory',
  //   cell: (info) => info.getValue(),
  //   header: () => <span>카테고리</span>,
  //   footer: (props) => props.column.id,
  // },
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
  // {
  //   accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  //   id: 'fullName',
  //   header: 'Full Name',
  //   cell: (info) => info.getValue(),
  //   footer: (props) => props.column.id,
  //   filterFn: 'fuzzy',
  //   sortingFn: fuzzySort,
  // },
];
