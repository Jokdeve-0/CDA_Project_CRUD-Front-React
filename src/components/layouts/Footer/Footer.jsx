import React from 'react';
import { NavLink } from 'react-router-dom';
export function Footer() {
    return (
        <footer>
        <p className=' bg-slate-900 p-4 text-center'>
            <span className='block w-full'>PROJECT CDA 2022</span>
            <span>database management by </span>
            <span className='cursor-pointer text-white hover:text-red-700' onClick={
                ()=>{document.location.href='https://www.addictocode.fr'}
            }>Jokdeve</span>
        </p>
        </footer>
    );
}