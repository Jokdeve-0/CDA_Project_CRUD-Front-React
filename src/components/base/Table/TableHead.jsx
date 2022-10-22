import React, { useMemo } from 'react';

import { TableHeadContext } from './TableHeadContext';

export function TableHead({ children }) {
  const contextHead = useMemo(() => ({ thead: true }));
  return (
    <TableHeadContext.Provider value={contextHead}>
      <thead>
        {children}
      </thead>
    </TableHeadContext.Provider>
  );
}
