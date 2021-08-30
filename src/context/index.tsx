import React, {ReactNode} from "react";
import {BrowserRouter} from "react-router-dom";
import {QueryClient,QueryClientProvider} from 'react-query'

import {AuthProvider} from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};