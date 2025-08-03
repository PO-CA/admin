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
      width: 50,
      renderCell: (params: any) => (
        <Link href={`/products/${params.value}`}>{params.value}</Link>
      ),
    },
    {
      field: 'buttons',
      headerName: '기능',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <CellButtons info={{ row: { original: params.row } }} />
      ),
    },
    {
      field: 'coordinateNames',
      headerName: '위치',
      width: 50,
    },
    {
      field: 'title',
      headerName: '앨범명',
      width: 500,
    },
    {
      field: 'artist',
      headerName: '가수',
      width: 100,
    },
    {
      field: 'sku',
      headerName: 'sku',
      width: 100,
    },
    {
      field: 'barcode',
      headerName: '바코드',
      width: 200,
    },
    {
      field: 'logiCategory',
      headerName: '카테고리',
      width: 100,
      valueGetter: (params: any) => {
        return params?.title;
      },
    },
    {
      field: 'price',
      headerName: '가격',
      width: 100,
    },
    {
      field: 'stock',
      headerName: '수량',
      width: 100,
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
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        loading={isLoading}
        disableRowSelectionOnClick
        showToolbar
      />
    </>
  );
}
