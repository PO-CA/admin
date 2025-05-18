'use client';
import { useGetAllUsersWithOrderItemsQty } from '@/query/query/users';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';

export default function CustomerTable() {
  const { data: usersData, isLoading } = useGetAllUsersWithOrderItemsQty();

  const columns = [
    {
      field: 'userEmail',
      headerName: '이메일',
      flex: 1,
      renderCell: (params: any) => (
        <Link href={`/customers/${params.value}`}>{params.value}</Link>
      ),
    },
    {
      field: 'nickname',
      headerName: '회사명',
      flex: 1,
    },
    {
      field: 'userLevel',
      headerName: '권한',
      flex: 1,
    },
    {
      field: 'inCharge',
      headerName: '담당자',
      flex: 1,
    },
  ];

  const rows = (usersData || []).map((row: any, idx: number) => ({
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
