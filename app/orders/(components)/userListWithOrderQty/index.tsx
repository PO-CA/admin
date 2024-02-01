import { ordersColumns } from '../tableColumns/ordersColumns';
import TanTable from '@/components/table';
import { getAllUsersWithOrderItemsQty } from '@/query/api/users';

export default async function UserListWithOrderQty() {
  const result = await getAllUsersWithOrderItemsQty();

  return <TanTable data={result} columns={ordersColumns} />;
}
