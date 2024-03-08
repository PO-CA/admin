'use client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';

export const ordersColumns: ColumnDef<any, any>[] = [
  // {
  //   accessorFn: (row) => row.userNickname,
  //   id: 'userNickname',
  //   cell: (info) => (
  //     <Link href={`/orders/${info.getValue()}`}>{info.getValue()}</Link>
  //   ),
  //   header: () => <span>닉네임</span>,
  //   footer: (props) => props.column.id,
  // },
  {
    accessorFn: (row) => row.userEmail,
    id: 'userEmail',
    cell: (info) => (
      <Link href={`/orders/${info.getValue()}`}>{info.getValue()}</Link>
    ),
    header: () => <span>이메일</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.logiOrderItemsQty,
    id: 'logiOrderItemsQty',
    cell: (info) => info.getValue(),
    header: () => <span>[앨범]주문건</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.logiOrderItemsTotalQty,
    id: 'logiOrderItemsTotalQty',
    cell: (info) => info.getValue(),
    header: () => <span>[앨범]총수량</span>,
    footer: (props) => props.column.id,
  },
  // {
  //   accessorFn: (row) => row.orderItemsQty,
  //   id: 'orderItemsQty',
  //   cell: (info) => info.getValue(),
  //   header: () => <span>[포카]주문건</span>,
  //   footer: (props) => props.column.id,
  // },
  // {
  //   accessorFn: (row) => row.orderItemsTotalQty,
  //   id: 'orderItemsTotalQty',
  //   cell: (info) => info.getValue(),
  //   header: () => <span>[포카]총수량</span>,
  //   footer: (props) => props.column.id,
  // },
  // {
  //   accessorFn: (row) => row.payRate,
  //   id: 'payRate',
  //   cell: (info) => info.getValue(),
  //   header: () => <span>[포카]수수료율</span>,
  //   footer: (props) => props.column.id,
  // },
];
