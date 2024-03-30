import React from 'react';
import { FadeLoader } from 'react-spinners';
import styles from './index.module.css';

export default function TableLoader() {
  return (
    <div className={styles.loaderContainer}>
      <FadeLoader height={15} width={7} radius={12} color="rgb(255, 247, 0)" />
    </div>
  );
}
