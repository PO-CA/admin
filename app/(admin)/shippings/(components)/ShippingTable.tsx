'use client';
import { useGetAllShippings } from '@/query/query/shippings';
import { DataGrid } from '@mui/x-data-grid';
import DeleteShippingButton from './deleteShippingButton';
import PayShippingButton from './payShippingButton';

export default function ShippingTable() {
  const { data: shippingData, isLoading } = useGetAllShippings();

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.5,
      renderCell: (params: any) => (
        <a href={`/shippings/${params.value}`}>{params.value}</a>
      ),
    },
    {
      field: 'createdAt',
      headerName: '발송일',
      flex: 1,
      valueGetter: (params: any) => {
        return params?.slice(0, 10);
      },
    },
    {
      field: 'userNickname',
      headerName: '닉네임',
      flex: 1,
    },
    {
      field: 'totalProductPrice',
      headerName: '상품가격',
      flex: 1,
    },
    {
      field: 'shippingFee',
      headerName: '배송비',
      flex: 1,
    },
    {
      field: 'memo',
      headerName: '배송메모',
      flex: 1,
    },
    {
      field: 'buttons',
      headerName: '',
      flex: 1.2,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <DeleteShippingButton info={{ row: { original: params.row } }} />
          <PayShippingButton info={{ row: { original: params.row } }} />
        </div>
      ),
    },
    {
      field: 'shippingStatus',
      headerName: '배송상태',
      flex: 1,
      valueGetter: (params: any) => {
        return params;
      },
    },
    {
      field: 'updatedAt',
      headerName: '배송/결제일',
      flex: 1,
      valueGetter: (params: any) => {
        return params?.slice(0, 10) || '';
      },
    },
  ];

  const rows = (shippingData || []).map((row: any, idx: number) => ({
    id: row.id || idx,
    ...row,
  }));

  return (
    <>
      <DataGrid
        sx={{ height: 'auto', background: 'white', fontSize: 14 }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[20, 50, 100]}
        loading={isLoading}
        disableRowSelectionOnClick
        showToolbar
      />
    </>
  );
}
