import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Backendless from "backendless";

const APP_ID = '70833ED6-CF55-DCA8-FFD1-0F4165255600';
const API_KEY = 'FFEAFF95-7EB6-49B6-BBD2-B5F7964DB25C';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
