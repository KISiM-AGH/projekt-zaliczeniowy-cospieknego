import ReactDOM from 'react-dom';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './app';
import { AuthProvider } from './context/authContext';
import { THEME } from './constants/theme';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider theme={THEME}>
                <CssBaseline />
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
