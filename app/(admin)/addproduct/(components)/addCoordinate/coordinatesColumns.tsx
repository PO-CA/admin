'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';

export const coordinatesColumns: ColumnDef<any, any>[] = [
  {
    id: 'select-col',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },

  {
    accessorFn: (row) => row.name,
    id: 'name',
    cell: (info) => info.getValue(),
    header: () => <span>좌표</span>,
    footer: (props) => props.column.id,
  },
];
