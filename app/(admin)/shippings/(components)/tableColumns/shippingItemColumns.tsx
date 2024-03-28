'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

export const shippingItemColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.title,
    id: 'title',
    cell: (info) => info.row.original.productName,
    header: () => <span>상품명</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.qty,
    id: 'qty',
    cell: (info) => info.getValue(),
    header: () => <span>수량</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => info.getValue(),
    header: () => <span>개당가격</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.totalPrice,
    id: 'totalPrice',
    cell: (info) => info.getValue(),
    header: () => <span>총 상품가격</span>,
    footer: (props) => props.column.id,
  },
];
