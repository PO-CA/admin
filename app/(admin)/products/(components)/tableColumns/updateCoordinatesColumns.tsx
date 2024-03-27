'use client';
import DeleteCoordinateButton from '@/app/(admin)/addproduct/(components)/addCoordinate/DeleteCoordinateButton';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import DeleteProductCoordinateButton from '../deleteProductCoordinateButton';
import CreateProductCoordinateButton from '../createProductCoordinateButton';

export const updateCoordinatesColumns: ColumnDef<any, any>[] = [
  {
    id: 'select-col',
    // header: ({ table }) => '',
    cell: ({ row }) => {
      return (
        <input
          type="checkbox"
          checked={row.original.isChecked}
          disabled
          onChange={row.getToggleSelectedHandler()}
        />
      );
    },
  },
  {
    accessorFn: (row) => row.name,
    id: 'name',
    cell: (info) => info.getValue(),
    header: () => <span>좌표</span>,
    footer: (props) => props.column.id,
  },
  {
    id: 'delete',
    cell: ({ row }) => (
      <div>
        <CreateProductCoordinateButton row={row} />
        <DeleteProductCoordinateButton row={row} />
        <DeleteCoordinateButton row={row} />
      </div>
    ),
    header: () => '',
    footer: (props) => props.column.id,
  },
];
