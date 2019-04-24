import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import './App.css';

import MobxRouterTest from './components/MobxRouterTest';
import TestMap from './components/TestMap';

@inject('routing')
@inject('test')
@observer
class App extends Component {
  render() {
    return <TestMap />;
  }
}

export default withRouter(App);
