import TanTable from '@/components/table';
import React from 'react';
import { creditsColumns } from '../tableColumns/creditsColumns';
import { getCreditsByUserNickname } from '@/query/api/credit';

export default async function Credits({
  userNickname,
}: {
  userNickname: string;
}) {
  const result = await getCreditsByUserNickname(userNickname);

  return <TanTable data={result} columns={creditsColumns} />;
}
