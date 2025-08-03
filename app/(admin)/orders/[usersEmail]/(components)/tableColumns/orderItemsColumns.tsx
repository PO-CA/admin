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
    renderCell: (params: any) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            alt="상품 이미지"
            unoptimized={true}
            src={params?.row?.thumbNailUrl}
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
          <div>상세페이지</div>
        </div>
      );
    },
  },
  {
    field: 'title',
    headerName: '제목',
    width: 200,
  },
  {
    field: 'barcode',
    headerName: '바코드/SKU',
    width: 200,
    renderCell: (params: any) => {
      const barcodeValue = params.row.barcode;
      const skuValue = params.row.sku;

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontWeight: 500,
              padding: '3px 0',
              whiteSpace: 'normal',
              lineHeight: '1.2',
            }}
          >
            바코드: {barcodeValue || '-'}
          </div>

          <div
            style={{
              fontSize: '0.85rem',
              padding: '3px 0',
              whiteSpace: 'normal',
              lineHeight: '1.2',
            }}
          >
            SKU: {skuValue || '-'}
          </div>
        </div>
      );
    },
  },
  {
    field: 'price',
    headerName: '판매가',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <UpdatePriceOrderItem info={{ row: { original: params.row } }} />
      </div>
    ),
  },
  {
    field: 'qty',
    headerName: '판매수량',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <UpdateQtyOrderItem info={{ row: { original: params.row } }} />
      </div>
    ),
  },
  {
    field: 'coordinates',
    headerName: '좌표',
    width: 100,
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
    width: 100,
  },
  {
    field: 'addressName',
    headerName: '배송지',
    width: 100,
  },
];
