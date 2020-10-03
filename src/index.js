import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import history from './services/history';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={history}>
    <Routes />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
