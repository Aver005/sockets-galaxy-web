/**
 * @fileoverview Компонент маршрутизации для Sockets Galaxy приложения
 * @description Определяет структуру маршрутов и связывает их с соответствующими компонентами
 */

import React, { type JSX } from 'react';
import { Route, Routes } from 'react-router';
import { DefaultLayout } from '@/app/layouts';
import { HomePage } from '@/app/pages';

/**
 * Компонент маршрутизации приложения
 * @description Настраивает маршруты приложения с использованием React Router.
 * Все маршруты обернуты в DefaultLayout для единообразного отображения.
 * @returns {JSX.Element} Структура маршрутов приложения
 */
const Router: React.FC = (): JSX.Element =>
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