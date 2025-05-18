'use client';
import { useGetAllUsersWithOrderItemsQty } from '@/query/query/users';
import { DataGrid } from '@mui/x-data-grid';

export default function UserListWithOrderQty() {
  const { data: usersOrdersata, isLoading: isUsersLoading } =
    useGetAllUsersWithOrderItemsQty();

  // MUI DataGrid columns 변환
  const columns = [
    {
      field: 'nickname',
      headerName: '회사명',
      flex: 1,
      renderCell: (params: any) => (
        <a href={`/orders/${params.row.userEmail}`}>{params.value}</a>
      ),
    },
    {
      field: 'userEmail',
      headerName: '이메일',
      flex: 1.5,
      renderCell: (params: any) => (
        <a href={`/orders/${params.value}`}>{params.value}</a>
      ),
    },
    {
      field: 'unpaidShippingQty',
      headerName: '미결제',
      flex: 0.7,
    },
    {
      field: 'logiOrderItemsQty',
      headerName: '[앨범]주문건',
      flex: 0.7,
    },
    {
      field: 'logiOrderItemsTotalQty',
      headerName: '[앨범]총수량',
      flex: 0.7,
    },
  ];

  // rows는 그대로 사용 (id 필드 필요)
  const rows = (usersOrdersata || []).map((row: any, idx: number) => ({
    id: row.userEmail || idx,
    ...row,
  }));

  return (
    <>
      <DataGrid
        sx={{ height: 'auto', background: 'white', fontSize: 14 }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[20, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        loading={isUsersLoading}
        disableRowSelectionOnClick
        showToolbar
      />
    </>
  );
}
