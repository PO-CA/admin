'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import AddOrderButton from './addOrderButton';

export const addOrderProductColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => {
      return <AddOrderButton info={info} />;
    },
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
