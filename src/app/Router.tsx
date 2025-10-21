import React from 'react';
import { Route, Routes } from 'react-router';
import { DefaultLayout } from '@/app/layouts';
import { HomePage } from '@/app/pages';

const Router: React.FC = () =>
{

    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    );
}

export default Router;