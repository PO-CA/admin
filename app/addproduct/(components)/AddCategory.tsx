'use client';
import React, { useState } from 'react';
import styles from '../page.module.css';
import { useCreateACategory } from '@/query/query/category';

export default function AddCategory() {
  const { mutate: createACategory } = useCreateACategory();

  const [category, setCategory] = useState('');
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>카테고리 추가</label>
      <input
        className={styles.inputCell}
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <button
        type="button"
        className={styles.addCategoryBtn}
        onClick={(e) => {
          e.preventDefault();
          createACategory(category);
          setCategory('');
        }}
      >
        추가
      </button>
    </div>
  );
}
