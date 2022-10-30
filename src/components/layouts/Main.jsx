import React from 'react';

export function Main({children}) {
    return (
        <main className='flex-1'>
            {children}
        </main>
    );
  }