import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import { AuthProvider } from './services/Auth';
import history from './services/history';
import * as serviceWorker from './serviceWorker';
import { GlobalContextProvider } from './globalContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
}, ptBR);

ReactDOM.render(
  <AuthProvider>
    <GlobalContextProvider>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </GlobalContextProvider>
  </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
