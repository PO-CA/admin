'use client';

import React from 'react';
import TanTable from '@/components/table';
import { useGetAllproducts } from '@/query/query/products';
import { productColumns } from '@/app/products/(components)/tableColumns/productColumns';

export default function AddOrderProduct() {
  const {
    data: productData,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
  } = useGetAllproducts();
  return (
    !isProductLoading &&
    isProductSuccess && <TanTable data={productData} columns={productColumns} />
  );
}
