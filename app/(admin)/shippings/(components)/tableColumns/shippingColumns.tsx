'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Link from 'next/link';
import DeleteShippingButton from '../deleteShippingButton';
import PayShippingButton from '../payShippingButton';

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
    accessorFn: (row) => row.createdAt,
    id: 'createdAt',
    cell: (info) => info.getValue()?.slice(0, 10),
    header: () => <span>발송일</span>,
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
  {
    // accessorFn: (row) => row.memo,
    id: 'buttons',
    cell: (info) => (
      <div style={{ display: 'flex' }}>
        <DeleteShippingButton info={info} />
        <PayShippingButton info={info} />
      </div>
    ),
    header: () => <span></span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.shippingStatus,
    id: 'shippingStatus',
    cell: (info) =>
      info.getValue() === '결제완료'
        ? info.row.original.updatedAt?.slice(0, 10)
        : '',
    header: () => <span></span>,
    footer: (props) => props.column.id,
  },
];
