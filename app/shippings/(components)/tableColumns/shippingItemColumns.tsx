'use client';
import { ColumnDef, SortingFn, sortingFns } from '@tanstack/react-table';
import React from 'react';
import { compareItems } from '@tanstack/match-sorter-utils';
import Link from 'next/link';

export const shippingItemColumns: ColumnDef<any, any>[] = [
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
  // {
  //   accessorFn: (row) => row.logiCategory.title,
  //   id: 'logiCategory',
  //   cell: (info) => info.getValue(),
  //   header: () => <span>카테고리</span>,
  //   footer: (props) => props.column.id,
  // },
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
