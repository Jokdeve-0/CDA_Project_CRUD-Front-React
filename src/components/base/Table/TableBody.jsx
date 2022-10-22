import React, { useMemo } from 'react';

import { TableHeadContext } from './TableHeadContext';

export function TableBody({ children }) {
  const contextBody = useMemo(() => ({ thead: false }));
  return (
    <TableHeadContext.Provider value={contextBody}>
      <tbody>
        {children}
      </tbody>
    </TableHeadContext.Provider>
  );
}
