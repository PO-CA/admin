'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

export const shippingItemColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    cell: (info) => info.getValue(),
    header: () => <span>no.</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.productName,
    id: 'productName',
    cell: (info) => info.getValue(),
    header: () => <span>Description of goods</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.qty,
    id: 'qty',
    cell: (info) => '',
    header: () => <span>Option</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.qty,
    id: 'qty',
    cell: (info) =>
      info.getValue() ? (
        <div style={{ height: '20px' }}>
          {info
            .getValue()
            ?.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}{' '}
          EA
        </div>
      ) : (
        <div style={{ height: '20px' }}></div>
      ),
    header: () => <span>Qty</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) =>
      info.getValue() ? (
        <p>
          {info
            .getValue()
            ?.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}{' '}
          KRW
        </p>
      ) : (
        ''
      ),
    header: () => <span>Unit price</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.totalPrice,
    id: 'totalPrice',
    cell: (info) =>
      info.getValue() ? (
        <p>
          {info
            .getValue()
            ?.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}{' '}
          KRW
        </p>
      ) : (
        ''
      ),
    header: () => <span>Amount</span>,
    footer: (props) => props.column.id,
  },
];
