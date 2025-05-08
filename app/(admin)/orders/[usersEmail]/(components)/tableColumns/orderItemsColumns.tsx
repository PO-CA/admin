'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';
import UpdatePriceOrderItem from '../../../(components)/updatePriceOrderItem';
import UpdateQtyOrderItem from '../../../(components)/updateQtyOrderItem';

export const orderItemsColumns: ColumnDef<any, any>[] = [
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
    accessorFn: (row) => row.thumbNailUrl,
    id: 'thumbNailUrl',
    cell: (info) => (
      <div>
        <Image
          alt="asd"
          unoptimized={true}
          src={info.getValue()}
          width={100}
          height={100}
        />
        <div>상세페이지</div>
      </div>
    ),
    header: () => <span>썸네일</span>,
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
    accessorFn: (row) => row.barcode,
    id: 'barcode',
    cell: (info) => (
      <div>
        <div>{info.getValue()}</div>
        <div>{info?.row?.original?.sku}</div>
      </div>
    ),
    header: () => <span>바코드/sku</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => <UpdatePriceOrderItem info={info} />,
    header: () => <span>판매가</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.qty,
    id: 'qty',
    cell: (info) => <UpdateQtyOrderItem info={info} />,
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
  {
    accessorFn: (row) => row.addressName,
    id: 'addressName',
    cell: (info) => info.getValue(),
    header: () => <span>배송지</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.coordinates,
    id: 'coordinates',
    cell: (info) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {info
          .getValue()
          ?.map((coordinate: any) => (
            <div key={coordinate.id}>{coordinate.name}</div>
          ))}
      </div>
    ),
    header: () => <span>좌표</span>,
    footer: (props) => props.column.id,
  },
];
