'use client';
import React, { useState } from 'react';
import styles from '../../page.module.css';
import { useCreateACategory, useDeleteACategory } from '@/query/query/category';

export default function DeleteCategory({ categoryId }: { categoryId: number }) {
  const { mutate: deleteACategory } = useDeleteACategory();

  return (
    <div className={styles.inputContainer}>
      <button
        type="button"
        className={styles.addCategoryBtn}
        onClick={(e) => {
          e.preventDefault();
          deleteACategory(categoryId);
        }}
      >
        삭제
      </button>
    </div>
  );
}
