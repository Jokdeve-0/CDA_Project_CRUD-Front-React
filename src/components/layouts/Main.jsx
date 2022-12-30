import React from 'react';

export function Main({children}) {
    return (
        <main className='flex-1 max-w-4xl mx-auto'>
            {children}
        </main>
    );
  }