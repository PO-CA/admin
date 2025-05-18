'use client';
import { useGetAllproducts } from '@/query/query/products';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import CellButtons from './CellButtons';

export default function ProductTable() {
  const { data: productsData, isLoading } = useGetAllproducts();

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.7,
      renderCell: (params: any) => (
        <Link href={`/products/${params.value}`}>{params.value}</Link>
      ),
    },
    {
      field: 'buttons',
      headerName: '기능',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <CellButtons info={{ row: { original: params.row } }} />
      ),
    },
    {
      field: 'coordinateNames',
      headerName: '위치',
      flex: 1,
    },
    {
      field: 'title',
      headerName: '제목',
      flex: 1,
    },
    {
      field: 'artist',
      headerName: '가수',
      flex: 1,
    },
    {
      field: 'sku',
      headerName: 'sku',
      flex: 1,
    },
    {
      field: 'barcode',
      headerName: '바코드',
      flex: 1,
    },
    {
      field: 'logiCategory',
      headerName: '카테고리',
      flex: 1,
      valueGetter: (params: any) => {
        return params?.title;
      },
    },
    {
      field: 'price',
      headerName: '가격',
      flex: 1,
    },
    {
      field: 'stock',
      headerName: '수량',
      flex: 1,
    },
  ];

  const rows = (productsData || []).map((row: any, idx: number) => ({
    id: row.id || idx,
    ...row,
  }));

  return (
    <>
      <DataGrid
        sx={{ height: 'auto', background: 'white', fontSize: 14 }}
        rows={rows}
        rowHeight={80}
        columns={columns}
        pageSizeOptions={[20, 50, 100]}
        loading={isLoading}
        disableRowSelectionOnClick
        showToolbar
      />
    </>
  );
}
