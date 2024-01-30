'use client';
import styles from './page.module.css';

export default function CustomerDetail({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  // const {
  //   data: orderItemsData,
  //   isLoading: isOrderItemsLoading,
  //   isSuccess: isOrderItemsSuccess,
  // } = useGetAOrderByUserNickname(userNickname);

  return (
    <main className={styles.productDetailContainer}>
      <div>상품-상세</div>
    </main>
  );
}
