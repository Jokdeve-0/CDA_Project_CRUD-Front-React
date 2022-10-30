import React from 'react';
import { Watch } from  'react-loader-spinner'

export function Spinner() {
    return (
        <div className='flex justify-center' >
            <Watch
                height="50"
                width="50"
                radius="48"
                color="#fff"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    );
}