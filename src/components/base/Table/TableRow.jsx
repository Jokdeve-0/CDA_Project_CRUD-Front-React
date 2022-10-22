import React from 'react';
import styles from './Table.module.scss';
export function TableRow({ children }) {
  return (
    <tr className={styles.tableRow}>
      {children}
    </tr>
  );
}
