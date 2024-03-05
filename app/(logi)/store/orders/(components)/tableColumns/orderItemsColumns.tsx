'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

export const orderItemsColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.thumbNailUrl,
    id: 'thumbNailUrl',
    cell: (info) => <img src={info.getValue()} />,
    header: () => <span>[앨범]주문건</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.title,
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => <span>제목</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.sku,
    id: 'sku',
    cell: (info) => info.getValue(),
    header: () => <span>SKU</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => info.getValue(),
    header: () => <span>판매가</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.qty,
    id: 'qty',
    cell: (info) => info.getValue(),
    header: () => <span>판매수량</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.totalPrice,
    id: 'totalPrice',
    cell: (info) => info.getValue(),
    header: () => <span>총액</span>,
    footer: (props) => props.column.id,
  },
];
