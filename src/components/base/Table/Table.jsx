import React from 'react';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';
import styles from './Table.module.scss';

function Table({ children }) {
  return (
    <div className={styles.boxTable}>
      <table>
        {children}
      </table>
    </div>
  );
}
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export { Table };
