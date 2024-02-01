import TanTable from '@/components/table';
import React from 'react';
import { creditsColumns } from '../tableColumns/creditsColumns';
import { getAllShippingsByUserNickname } from '@/query/api/shipping';
import { shippingColumns } from '@/app/shippings/(components)/tableColumns/shippingColumns';

export default async function Shippings({
  userNickname,
}: {
  userNickname: string;
}) {
  const result = await getAllShippingsByUserNickname(userNickname);

  return <TanTable data={result} columns={shippingColumns} />;
}
