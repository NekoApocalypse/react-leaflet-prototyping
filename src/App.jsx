import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Switch, Route } from 'react-router-dom';
import './App.css';

// import MobxRouterTest from './components/MobxRouterTest';
// import MapTest from './components/MapTest';
import MapPage from './containers/MapPage';

@inject('rootStore')
@observer
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MapPage} />
      </Switch>
    );
  }
}

export default withRouter(App);
