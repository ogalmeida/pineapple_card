import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';

import { BrowserRouter } from 'react-router-dom';

import Routes from '../routes';
import GlobalStyle from '../styles/global';

const App = () => {
    return (
        <ToastProvider autoDismiss autoDismissTimeout={6000}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
            <GlobalStyle />
        </ToastProvider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
