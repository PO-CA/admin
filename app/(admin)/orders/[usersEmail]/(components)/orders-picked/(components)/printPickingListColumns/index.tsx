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
    disableColumnMenu: true,
    editable: false,
    renderCell: (params: any) => (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    editable: false,
    renderCell: (params: any) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '4px 0',
        }}
      >
        <div
          style={{ fontWeight: 500, whiteSpace: 'normal', lineHeight: '1.2' }}
        >
          {params.row.original.barcode || '-'}
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: '#666',
            whiteSpace: 'normal',
            lineHeight: '1.2',
          }}
        >
          {params.row.original.sku || '-'}
        </div>
      </div>
    ),
  },
  {
    field: 'title',
    headerName: '제목',
    width: 200,
    flex: 1.5,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    editable: false,
    renderCell: (params: any) => (
      <div style={{ whiteSpace: 'normal', lineHeight: '1.2' }}>
        {params.row.original.title}
      </div>
    ),
  },
  {
    field: 'qty',
    headerName: '수량',
    width: 80,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    editable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => (
      <div style={{ fontWeight: 'bold' }}>{params.row.original.qty}</div>
    ),
  },
  {
    field: 'coordinates',
    headerName: '좌표',
    width: 120,
    flex: 0.8,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    editable: false,
    renderCell: (params: any) => (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {params.row.original?.coordinates?.map((coordinate: any) => (
          <div
            key={coordinate.id}
            style={{
              padding: '2px 0',
              whiteSpace: 'normal',
              lineHeight: '1.2',
              fontWeight: 500,
            }}
          >
            {coordinate.name}
          </div>
        ))}
      </div>
    ),
  },
];
