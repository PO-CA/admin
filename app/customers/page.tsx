import TanTable from '@/components/table';
import styles from './page.module.css';
import { getAllUsersWithOrderItemsQty } from '@/query/api/users';
import { usersColumns } from './(components)/tableColumns/usersColumns';

export default async function Customers() {
  const result = await getAllUsersWithOrderItemsQty();

  return (
    <main className={styles.customersContainer}>
      <div>유저-목록</div>
      <TanTable data={result} columns={usersColumns} />
    </main>
  );
}
