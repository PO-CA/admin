import React from 'react';
import styles from '../page.module.css';
import { useGetAllCategory } from '@/query/query/category';

export default function CategorySelect({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isSuccess: isCategorySuccess,
  } = useGetAllCategory();

  if (isCategoryLoading) return <div>loading</div>;

  if (!isCategorySuccess) return <div>fail</div>;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>카테고리</label>
      <select id="categoryId" onChange={onChange}>
        <option defaultChecked></option>
        {categoryData.map((category: any, i: number) => (
          <option key={`category.title${i}`} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
}
