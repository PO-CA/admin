'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Link from 'next/link';
import { toDateString } from '@/utils/utils';

export const withdrawColumns: ColumnDef<any, any>[] = [
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
    cell: (info) => toDateString(info.getValue()),
    header: () => <span>주문일</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.ordersStatus,
    id: 'ordersStatus',
    cell: (info) => info.getValue(),
    header: () => <span>상태</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.nickname,
    id: 'nickname',
    cell: (info) => info.getValue(),
    header: () => <span>아이디</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.receiver,
    id: 'receiver',
    cell: (info) => info.getValue(),
    header: () => <span>수령인</span>,
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
    accessorFn: (row) => row.totalPrice,
    id: 'totalPrice',
    cell: (info) => info.getValue(),
    header: () => <span>총액ㅈ</span>,
    footer: (props) => props.column.id,
  },
];
