'use client';

import TanTable from '@/components/table';
import { useGetCreditsByUserNickname } from '@/query/query/credit';
import React from 'react';
import { creditsColumns } from '../tableColumns/creditsColumns';

export default function Credits({ userNickname }: any) {
  const {
    data: creditData,
    isLoading: isCreditLoading,
    isSuccess: isCreditSuccess,
  } = useGetCreditsByUserNickname(userNickname);

  return (
    !isCreditLoading &&
    isCreditSuccess && <TanTable data={creditData} columns={creditsColumns} />
  );
}
