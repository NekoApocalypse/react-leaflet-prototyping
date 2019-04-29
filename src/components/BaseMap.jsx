import React, { Component } from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  ZoomControl,
  LayersControl,
} from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes as oPropTypes, observer } from 'mobx-react';
import PropTypes from 'prop-types';
// import { Typography } from '@material-ui/core';

import { Marker as MapMarker } from '../stores/MapStore';
import { layersProperty } from '../consts';
import InvisibleControl from './InvisibleControl';
import ButtonControl from './ButtonControl';
import SimpleModal from './SimpleModal';

// const { BaseLayer, Overlay } = LayersControl;
const { BaseLayer } = LayersControl;

const styles = {
  root: {
    height: '100vh',
  },
};

// Renders a set of markers.
const MarkerSet = observer((props) => {
  const { markers } = props;
  return (
    <React.Fragment>
      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position}>
          <Tooltip>{marker.id}</Tooltip>
          <Popup>{`Position ${marker.position}`}</Popup>
        </Marker>
      ))}
    </React.Fragment>
  );
});

// The Base Map component.
@observer
class BaseMap extends Component {
  state = {
    modalOpen: false,
  }

  handleModalOpen = () => {
    this.setState({
      modalOpen: true,
    });
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    const {
      position, zoom, markers, classes,
    } = this.props;
    const {
      modalOpen,
    } = this.state;
    return (
      <React.Fragment>
        <Map center={position} zoom={zoom} className={classes.root} zoomControl={false}>
          <InvisibleControl />
          <InvisibleControl position="topright" />
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap from web">
              <TileLayer
                {...layersProperty.osmWeb}
              />
            </BaseLayer>
            <BaseLayer name="OpenStreetMap Black and White from web">
              <TileLayer
                {...layersProperty.osmWebBlackWhite}
              />
            </BaseLayer>
          </LayersControl>
          <ZoomControl position="topleft" />
          <ButtonControl handleClick={this.handleModalOpen} />
          <MarkerSet markers={markers} />
        </Map>
        <SimpleModal open={modalOpen} handleClose={this.handleModalClose} />
      </React.Fragment>
    );
  }
}

BaseMap.propTypes = {
  position: oPropTypes.arrayOrObservableArrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  markers: oPropTypes.arrayOrObservableArrayOf(
    PropTypes.instanceOf(MapMarker),
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BaseMap);
