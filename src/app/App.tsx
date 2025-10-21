import React from 'react';
import { HashRouter } from 'react-router';
import { QueryClientProvider } from 'react-query';
import Router from '@/app/Router';
import queryClient from '@/app/queryClient';

const App: React.FC = () =>
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