import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import theme from 'theme';

import '@fontsource/roboto/latin.css';
import '@fontsource/roboto/cyrillic.css';
import './index.css';
import App from './App';

// TODO Вернуть React.StrictMode после обновления @material-ui до версии 5.

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
