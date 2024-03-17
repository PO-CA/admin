'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import DeleteCartButton from '../deleteCartButton';

export const cartColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.logiProduct.artist,
    id: 'artist',
    cell: (info) => info.getValue(),
    header: () => <span>가수</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.logiProduct.title,
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => <span>제목</span>,
    footer: (props) => props.column.id,
  },

  {
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => info.getValue(),
    header: () => <span>가격</span>,
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
    accessorFn: (row) => row.totalPrice,
    id: 'totalPrice',
    cell: (info) => info.getValue(),
    header: () => <span>총액</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.id,
    id: 'id',
    header: () => '',

    cell: (info) => {
      return <DeleteCartButton info={info} />;
    },
  },
];
