'use client';
import Image from 'next/image';
import React from 'react';
import UpdatePriceOrderItem from '../../../(components)/updatePriceOrderItem';
import UpdateQtyOrderItem from '../../../(components)/updateQtyOrderItem';

export const orderItemsColumns = [
  {
    field: 'thumbNailUrl',
    headerName: '썸네일',
    width: 150,
    renderCell: (params: any) => (
      <div>
        <Image
          alt="상품 이미지"
          unoptimized={true}
          src={params.value}
          width={100}
          height={100}
        />
        <div>상세페이지</div>
      </div>
    ),
  },
  {
    field: 'title',
    headerName: '제목',
    flex: 1,
  },
  {
    field: 'barcode',
    headerName: '바코드/sku',
    flex: 1,
    renderCell: (params: any) => (
      <div>
        <div>{params.value}</div>
        <div>{params.row.sku}</div>
      </div>
    ),
  },
  {
    field: 'price',
    headerName: '판매가',
    flex: 1,
    renderCell: (params: any) => (
      <UpdatePriceOrderItem info={{ row: { original: params.row } }} />
    ),
  },
  {
    field: 'qty',
    headerName: '판매수량',
    flex: 1,
    renderCell: (params: any) => (
      <UpdateQtyOrderItem info={{ row: { original: params.row } }} />
    ),
  },
  {
    field: 'coordinates',
    headerName: '좌표',
    flex: 1,
    renderCell: (params: any) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {params.value?.map((coordinate: any) => (
          <div key={coordinate.id}>{coordinate.name}</div>
        ))}
      </div>
    ),
  },
  {
    field: 'totalPrice',
    headerName: '총액',
    flex: 1,
  },
  {
    field: 'addressName',
    headerName: '배송지',
    flex: 1,
  },
];
