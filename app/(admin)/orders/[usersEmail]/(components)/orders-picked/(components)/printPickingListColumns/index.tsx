'use client';
import Image from 'next/image';
import React from 'react';
import { GridColDef } from '@mui/x-data-grid';

export const printPickingListColumns: GridColDef[] = [
  {
    field: 'thumbNailUrl',
    headerName: '썸네일',
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => (
      <div>
        <Image
          alt="상품 이미지"
          unoptimized={true}
          src={params.row.original.thumbNailUrl}
          width={50}
          height={50}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
  },
  {
    field: 'barcode',
    headerName: '바코드/sku',
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => (
      <div>
        <div>{params.row.original.barcode}</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>
          {params.row.original.sku}
        </div>
      </div>
    ),
  },
  {
    field: 'title',
    headerName: '제목',
    flex: 2,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => params.row.original.title,
  },
  {
    field: 'qty',
    headerName: '수량',
    width: 70,
    sortable: false,
    filterable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => params.row.original.qty,
  },
  {
    field: 'coordinates',
    headerName: '좌표',
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {params.row.original?.coordinates?.map((coordinate: any) => (
          <div key={coordinate.id} style={{ padding: '2px 0' }}>
            {coordinate.name}
          </div>
        ))}
      </div>
    ),
  },
];
