'use client';

import { useGetAllShippings } from '@/query/query/shippings';
import styles from './page.module.css';
import TanTable from '@/components/table';
import { shippingColumns } from './(components)/tableColumns/shippingColumns';

export default function Shippings() {
  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippings();

  console.log('shippingData', shippingData);
  return (
    <main className={styles.shippingsContainer}>
      <div>배송</div>
      {!isShippingLoading && isShippingSuccess && (
        <TanTable data={shippingData} columns={shippingColumns} />
      )}
    </main>
  );
}
