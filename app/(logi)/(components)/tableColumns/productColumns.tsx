'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import AddOrderButton from '../addCartButton';
import AddCartButton from '../addCartButton';

export const productColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.logiCategory.title,
    id: 'logiCategory',
    cell: (info) => info.getValue(),
    header: () => <span>카테고리</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.thumbNailUrl,
    id: 'thumbNailUrl',
    cell: (info) => info.getValue(),
    header: () => <span>썸네일</span>,
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
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => {
      console.log('info', info.row.original.dcPrice);
      return (
        <div>
          <div>{info.getValue()}</div>
          <div>{info.row.original.dcPrice}</div>
        </div>
      );
    },
    header: () => <span>가격</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => {
      return <AddCartButton info={info} />;
    },
  },
];
