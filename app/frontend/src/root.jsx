import React from 'react';
import App from './components/app';
import { HashRouter } from 'react-router-dom';

export default function Root() {
    return (
        <div>
            <HashRouter>
                <App />
            </HashRouter>
        </div>
    );
}
