import React from 'react';
import { Outlet } from 'react-router';

const Default: React.FC = () =>
{

    return (
        <div className='min-h-screen mx-auto w-full'>
            <Outlet />
        </div>
    );
}

export default Default;