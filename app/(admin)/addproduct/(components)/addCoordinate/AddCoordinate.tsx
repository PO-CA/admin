'use client';
import React, { useState } from 'react';
import styles from '../../page.module.css';
import { useCreateACoordinate } from '@/query/query/coordinate';

export default function AddCoordinate() {
  const { mutate: createACoordinate } = useCreateACoordinate();

  const [coordinate, setCoordinate] = useState('');
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>좌표 추가</label>
      <input
        className={styles.inputCell}
        type="text"
        onChange={(e) => setCoordinate(e.target.value)}
        value={coordinate}
      />
      <button
        type="button"
        className={styles.addCategoryBtn}
        onClick={(e) => {
          e.preventDefault();
          createACoordinate(coordinate);
          setCoordinate('');
        }}
      >
        추가
      </button>
    </div>
  );
}
