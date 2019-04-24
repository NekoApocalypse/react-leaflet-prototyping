import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route } from 'react-router';

import 'leaflet/dist/leaflet.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TestStore from './stores/TestStore';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const testStore = new TestStore();

const stores = {
  test: testStore,
  routing: routingStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
