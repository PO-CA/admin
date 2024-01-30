import React from 'react';
import styles from '../page.module.css';

export default function AddProductInput({
  inputType,
  labelName,
  keyName,
  value,
}: any) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>{labelName}</label>
      <input
        className={styles.inputCell}
        type={inputType}
        id={keyName}
        name={keyName}
        value={value}
      />
    </div>
  );
}
