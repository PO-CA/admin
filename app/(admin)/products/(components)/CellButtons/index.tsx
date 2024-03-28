import { useDeleteAProduct } from '@/query/query/products';
import React from 'react';

export default function CellButtons({ info }: any) {
  console.log('info', info);

  const { mutate: deleteProduct } = useDeleteAProduct();

  return (
    <div>
      <button onClick={() => deleteProduct(info.row.original.id)}>삭제</button>
      <button>수정</button>
    </div>
  );
}
