/**
 * @fileoverview Корневой компонент Sockets Galaxy приложения
 * @description Настраивает провайдеры и маршрутизацию для всего приложения
 */

import React, { type JSX } from 'react';
import { HashRouter } from 'react-router';
import { QueryClientProvider } from 'react-query';
import Router from '@/app/Router';
import queryClient from '@/app/queryClient';

/**
 * Корневой компонент приложения
 * @description Оборачивает приложение в необходимые провайдеры:
 * - HashRouter для маршрутизации
 * - QueryClientProvider для управления серверным состоянием
 * @returns {JSX.Element} Корневой элемент приложения
 */
const App: React.FC = (): JSX.Element =>
{
    return (
        <HashRouter>
            <QueryClientProvider client={queryClient}>
                <Router />
            </QueryClientProvider>
        </HashRouter>
    );
}

export default App;