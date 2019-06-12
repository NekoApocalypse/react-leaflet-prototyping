import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route } from 'react-router';
import L from 'leaflet';
import { ThemeProvider } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import 'leaflet/dist/leaflet.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RootStore from './stores';
import customTheme from './theme';
import { CssBaseline } from '@material-ui/core';

// --- Hotfix for leaflet icon ---
// !!! Do not remove !!!

/* eslint-disable no-underscore-dangle */
delete L.Icon.Default.prototype._getIconUrl;
/* eslint-disable global-require */
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// --- Hotfix for leaflet icon ---

const rootStore = new RootStore();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, rootStore.routerStore);

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
