'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

export const dcAmountColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.logiCategory.title,
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => <span>카테고리</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.amount,
    id: 'amount',
    cell: (info) => `${info.getValue()} 원`,
    header: () => <span>할인액</span>,
    footer: (props) => props.column.id,
  },
];
