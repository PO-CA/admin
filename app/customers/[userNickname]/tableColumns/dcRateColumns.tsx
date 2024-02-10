'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

export const dcRateColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.logiCategory.title,
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => <span>카테고리</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.rate,
    id: 'rate',
    cell: (info) => `${info.getValue()} %`,
    header: () => <span>할인률</span>,
    footer: (props) => props.column.id,
  },
];
