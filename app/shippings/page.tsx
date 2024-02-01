import styles from './page.module.css';
import TanTable from '@/components/table';
import { shippingColumns } from './(components)/tableColumns/shippingColumns';
import { getAllShippings } from '@/query/api/shipping';

export default async function Shippings() {
  const shippingData = await getAllShippings();

  return (
    <main className={styles.shippingsContainer}>
      <div className={styles.subTitle}>배송</div>
      <TanTable data={shippingData} columns={shippingColumns} />
    </main>
  );
}
