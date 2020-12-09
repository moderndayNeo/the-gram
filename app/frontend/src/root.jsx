import React from 'react';
import App from './components/app';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const Root = ({ store }) => {
    return (
        <div>
            <Provider store={store}>
                <HashRouter>
                    <App />
                </HashRouter>
            </Provider>
        </div>
    );
};

export default Root;