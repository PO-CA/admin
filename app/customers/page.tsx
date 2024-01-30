'use client';

import { useGetAllUsersWithOrderItemsQty } from '@/query/query/users';
import styles from './page.module.css';
import TanTable from '@/components/table';
import { usersColumns } from './(components)/tableColumns/usersColumns';

export default function Customers() {
  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useGetAllUsersWithOrderItemsQty();

  return (
    <main className={styles.customersContainer}>
      <div>유저-목록</div>
      {!isUserLoading && isUserSuccess && (
        <TanTable data={userData} columns={usersColumns} />
      )}
    </main>
  );
}
