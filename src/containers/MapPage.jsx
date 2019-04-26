import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

// import MobxRouterTest from './components/MobxRouterTest';
// import MapTest from './components/MapTest';
import BaseMap from '../components/BaseMap';
import TitleBar from '../components/TitleBar';

@inject('rootStore')
@observer
class MapPage extends Component {
  render() {
    const {
      rootStore: {
        mapStore: {
          initViewPort: {
            position, zoom,
          },
          markers,
        },
      },
    } = this.props;
    return (
      <React.Fragment>
        <TitleBar />
        <BaseMap
          position={position}
          zoom={zoom}
          markers={markers}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(MapPage);
