import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {ThirdwebProvider} from '@thirdweb-dev/react';
import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain={11155111} clientId='8a5ede49daa9f9ff6fa74f470b5b66e7'>
        <Router>
            <StateContextProvider>
                <App/>
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)