import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from "react-redux";
import store from './store/index';
import {createTheme, ThemeProvider} from "@mui/material";
import {amber} from "@mui/material/colors";
import {BrowserRouter} from "react-router-dom";
import {BASE_FRONTEND_URL} from "@/config";

const theme = createTheme({
    palette: {
        primary: {
            light: '#58865d',
            main: '#2f6835',
            dark: '#204825',
            contrastText: '#fff',
        },
        secondary: amber,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                }
            },
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
