import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './Components/Hooks/useAuth';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './css/TypoCustom.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0f766e',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
