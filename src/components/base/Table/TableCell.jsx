import React, { useContext } from 'react';

import { TableHeadContext } from './TableHeadContext';
import styles from './Table.module.scss';

export function TableCell({
  children,
  ...otherProps
}) {
  const isThead = useContext(TableHeadContext);
  const Cell = isThead.thead ? 'th' : 'td';
  return (
    <Cell
      {...otherProps}
      className={ isThead.thead 
      ? styles.tableHeadCell
      : styles.tableBodyCell
       }
    >
      {children}
    </Cell>
  );
}
