'use client';
import { useGetUsersDetailByUsersNickname } from '@/query/query/users';
import styles from './page.module.css';
import TanTable from '@/components/table';
import {
  useGetDCAmountByUserNickname,
  useGetDCRateByUserNickname,
} from '@/query/query/dc';
import { useGetAddressByUserNickname } from '@/query/query/address';
import { dcAmountColumns } from './tableColumns/dcAmountColumns';
import { dcRateColumns } from './tableColumns/dcRateColumns';
import { addressColumns } from './tableColumns/addressColumns';

export default function CustomerDetail({
  params,
}: {
  params: { userNickname: string };
}) {
  const { userNickname } = params;
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetUsersDetailByUsersNickname(userNickname);

  const {
    data: dcAmountData,
    isLoading: isDcAmountLoading,
    isSuccess: isDcAmountSuccess,
  } = useGetDCAmountByUserNickname(userNickname);

  const {
    data: dcRateData,
    isLoading: isDcRateLoading,
    isSuccess: isDcRateSuccess,
  } = useGetDCRateByUserNickname(userNickname);

  const {
    data: addressData,
    isLoading: isAddressLoading,
    isSuccess: isAddressSuccess,
  } = useGetAddressByUserNickname(userNickname);

  return (
    <main className={styles.customersDetailContainer}>
      <div className={styles.subTitle}>고객-상세</div>

      {!isUsersLoading && isUsersSuccess && (
        <div className={styles.userDataContainer}>
          <div>아이디</div> <div>{usersData.nickname}</div> <div>아이디</div>{' '}
          <div>{usersData.nickname}</div> <div>아이디</div>{' '}
          <div>{usersData.nickname}</div>{' '}
        </div>
      )}

      <div style={{ display: 'flex' }}>
        <div>
          <div className={styles.subTitle}>유저-할인률</div>
          {!isDcRateLoading && isDcRateSuccess && (
            <TanTable
              data={dcRateData}
              columns={dcRateColumns}
              useSearch={false}
              useFilter={false}
            />
          )}
        </div>
        <div>
          <div className={styles.subTitle}>유저-할인액</div>
          {!isDcAmountLoading && isDcAmountSuccess && (
            <TanTable
              data={dcAmountData}
              columns={dcAmountColumns}
              useSearch={false}
              useFilter={false}
            />
          )}
        </div>
      </div>

      <div className={styles.subTitle}>배송지</div>
      {!isAddressLoading && isAddressSuccess && (
        <TanTable
          data={addressData}
          columns={addressColumns}
          useSearch={false}
          useFilter={false}
          usePagenation={false}
        />
      )}
    </main>
  );
}
